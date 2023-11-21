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


# @router.get("/buyer/products")
# def list_products( repo: ProductQueries = Depends()):
#     return {"products": repo.get_all_products()}

# @router.get("/buyer/{product_id}")
# def product_detail(product_id: str, repo: ProductQueries = Depends()):
#     return {"product": repo.get_one_vendor(product_id)}
