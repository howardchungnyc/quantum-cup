from fastapi import APIRouter, Depends
from models.vendor import Vendor, VendorList
from queries.buyers import BuyerQueries


router = APIRouter()


@router.get("/buyer", response_model=VendorList)
def list_vendors(repo: BuyerQueries = Depends()):
    return {"vendors": repo.get_all_vendors()}


@router.get("/buyer/{vendor_id}", response_model=Vendor)
def vendor_detail(vendor_id: str, repo: BuyerQueries = Depends()):
    vendor = repo.get_one_vendor(vendor_id)
    return vendor
