from fastapi import APIRouter, Depends
from models.vendor import Vendor, VendorList
from models.products import ProductList, ProductOut
from queries.buyers import BuyerQueries
from queries.products import ProductQueries


router = APIRouter()


@router.get("/buyer", response_model=VendorList)
def list_vendors(repo: BuyerQueries = Depends()):
    return {"vendors": repo.get_all_vendors()}


@router.get("/buyer/{vendor_id}", response_model=Vendor)
def vendor_detail(vendor_id: str, repo: BuyerQueries = Depends()):
    vendor = repo.get_one_vendor(vendor_id)
    return vendor


@router.get("/products", response_model=ProductList)
def list_products(repo: ProductQueries = Depends()):
    return {"products": repo.get_all_products()}


@router.get("/products/{product_id}", response_model=ProductOut)
def product_detail(product_id: str, repo: ProductQueries = Depends()):
    product = repo.get_one_product(product_id)
    return product
