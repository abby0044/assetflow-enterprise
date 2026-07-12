from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="AssetFlow API")
@app.get("/")
def read_root():
    return {"message": "AssetFlow API is running perfectly, bro!"}

class AssetCreate(BaseModel):
    name: str
    category: str
    location: str

fake_db_assets = []
asset_counter = 1

@app.post("/api/assets")
def register_asset(asset: AssetCreate):
    global asset_counter
    new_asset = {
        "asset_tag": f"AF-{asset_counter:04d}",
        "name": asset.name,
        "category": asset.category,
        "status": "Available",
        "location": asset.location
    }
    asset_counter += 1
    fake_db_assets.append(new_asset)
    return new_asset

@app.get("/api/assets")
def get_assets():
    return fake_db_assets

# --- Pydantic Models for Organization Setup ---
class DepartmentCreate(BaseModel):
    name: str
    status: str = "Active"

class UserCreate(BaseModel):
    name: str
    email: str
    department_id: int

# --- Dummy Databases (Replace later if using real SQL) ---
fake_db_departments = []
fake_db_users = [
    {"id": 1, "name": "Anaya", "email": "anaya@assetflow.com", "department_id": 1, "role": "Asset Manager"}
]
dept_counter = 1
user_counter = 2

# --- Department Endpoints ---
@app.post("/api/departments")
def create_department(dept: DepartmentCreate):
    global dept_counter
    new_dept = {
        "id": dept_counter, 
        "name": dept.name, 
        "status": dept.status
    }
    fake_db_departments.append(new_dept)
    dept_counter += 1
    return new_dept

@app.get("/api/departments")
def get_departments():
    return fake_db_departments

# --- User/Employee Endpoints ---
@app.post("/api/users")
def register_user(user: UserCreate):
    global user_counter
    # Hackathon logic: Signup creates an Employee account by default
    new_user = {
        "id": user_counter, 
        "name": user.name, 
        "email": user.email, 
        "department_id": user.department_id,
        "role": "Employee" 
    }
    fake_db_users.append(new_user)
    user_counter += 1
    return new_user

@app.get("/api/users")
def get_users():
    return fake_db_users

from fastapi import HTTPException

# --- Pydantic Models for Allocation ---
class AllocationCreate(BaseModel):
    asset_tag: str
    user_id: int
    expected_return_date: str

fake_allocations = []
allocation_counter = 1

# --- Allocation Endpoints ---
@app.post("/api/allocations")
def allocate_asset(req: AllocationCreate):
    global allocation_counter
    
    # 1. Find the asset in our fake_db
    asset = next((a for a in fake_db_assets if a["asset_tag"] == req.asset_tag), None)
    
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
        
    # 2. THE CONFLICT RULE: Check if it's already allocated
    if asset["status"] != "Available":
        raise HTTPException(
            status_code=400, 
            detail=f"Conflict: Asset is currently {asset['status']} and cannot be allocated."
        )
        
    # 3. Update asset status and create allocation record
    asset["status"] = "Allocated"
    
    new_allocation = {
        "id": allocation_counter,
        "asset_tag": req.asset_tag,
        "user_id": req.user_id,
        "expected_return_date": req.expected_return_date,
        "status": "Active"
    }
    fake_allocations.append(new_allocation)
    allocation_counter += 1
    
    return new_allocation

@app.get("/api/allocations")
def get_allocations():
    return fake_allocations

from datetime import datetime
from fastapi import HTTPException

# --- Pydantic Models for Bookings ---
class BookingCreate(BaseModel):
    asset_tag: str
    user_id: int
    start_time: datetime
    end_time: datetime

fake_bookings = []
booking_counter = 1

# --- Booking Endpoints ---
@app.post("/api/bookings")
def create_booking(req: BookingCreate):
    global booking_counter
    
    # 1. Verify the asset exists and is bookable
    asset = next((a for a in fake_db_assets if a["asset_tag"] == req.asset_tag), None)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    
    if not asset.get("is_bookable"):
        raise HTTPException(status_code=400, detail="This asset is not a shared/bookable resource.")

    # 2. THE OVERLAP RULE: Check against existing bookings for this asset
    for booking in fake_bookings:
        if booking["asset_tag"] == req.asset_tag and booking["status"] != "Cancelled":
            # Check for overlap: new start < existing end AND new end > existing start
            if req.start_time < booking["end_time"] and req.end_time > booking["start_time"]:
                raise HTTPException(
                    status_code=400, 
                    detail="Conflict: This resource is already booked during the requested time slot."
                )
                
    # 3. Create the booking
    new_booking = {
        "id": booking_counter,
        "asset_tag": req.asset_tag,
        "user_id": req.user_id,
        "start_time": req.start_time,
        "end_time": req.end_time,
        "status": "Upcoming"
    }
    fake_bookings.append(new_booking)
    booking_counter += 1
    
    return new_booking

@app.get("/api/bookings")
def get_bookings():
    return fake_bookings

# --- Pydantic Models for Maintenance ---
class MaintenanceCreate(BaseModel):
    asset_tag: str
    issue_description: str
    priority: str

class MaintenanceUpdate(BaseModel):
    status: str # "Approved", "Resolved", "Rejected"

fake_maintenance_requests = []
maintenance_counter = 1

# --- Maintenance Endpoints ---
@app.post("/api/maintenance")
def raise_maintenance_request(req: MaintenanceCreate):
    global maintenance_counter
    
    # 1. Verify asset exists
    asset = next((a for a in fake_db_assets if a["asset_tag"] == req.asset_tag), None)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
        
    # 2. Create the request
    new_request = {
        "id": maintenance_counter,
        "asset_tag": req.asset_tag,
        "issue_description": req.issue_description,
        "priority": req.priority,
        "status": "Pending"
    }
    fake_maintenance_requests.append(new_request)
    maintenance_counter += 1
    
    return new_request

@app.put("/api/maintenance/{request_id}")
def update_maintenance_status(request_id: int, update: MaintenanceUpdate):
    # 1. Find the request
    request = next((r for r in fake_maintenance_requests if r["id"] == request_id), None)
    if not request:
        raise HTTPException(status_code=404, detail="Maintenance request not found")
        
    # 2. Find the associated asset
    asset = next((a for a in fake_db_assets if a["asset_tag"] == request["asset_tag"]), None)
    
    # 3. Update request status
    request["status"] = update.status
    
    # 4. Auto-update Asset Status based on workflow rules
    if update.status == "Approved" and asset:
        asset["status"] = "Under Maintenance"
    elif update.status == "Resolved" and asset:
        asset["status"] = "Available"
        
    return request

@app.get("/api/maintenance")
def get_maintenance_requests():
    return fake_maintenance_requests
