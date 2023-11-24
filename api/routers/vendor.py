from fastapi import APIRouter, Depends
from models.vendor import Vendor, VendorList
from queries.vendor import VendorQueries

router = APIRouter()


@router.get("/api/vendors", response_model=VendorList)
def list_vendors(repo: VendorQueries = Depends()):
    return {"vendors": repo.get_all_vendors()}


@router.get("/api/vendors/{vendor_id}", response_model=Vendor)
def vendor_detail(vendor_id: str, repo: VendorQueries = Depends()):
    vendor = repo.get_one_vendor(vendor_id)
    return vendor
