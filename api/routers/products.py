from fastapi import APIRouter, Depends
from queries.products import ProductQueries
from models.products import ProductOut, ProductIn, ProductList
from authenticator import authenticator

router = APIRouter()


@router.post("/api/products", response_model=ProductOut)
def create_product(
    product: ProductIn,
    repo: ProductQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(product, vendor_id=account_data["id"])


@router.get("/api/products")
def list_products(repo: ProductQueries = Depends()) -> ProductList:
    return repo.get_all_products()


@router.get("/api/products/{product_id}")
def product_detail(product_id: str, repo: ProductQueries = Depends()):
    return repo.get_one_product(product_id)
