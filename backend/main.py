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
