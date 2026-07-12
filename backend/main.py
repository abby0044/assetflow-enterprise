from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="AssetFlow API")

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
