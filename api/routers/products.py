from fastapi import APIRouter, Depends
from queries.products import ProductQueries
from models.products import ProductOut, ProductIn
from authenticator import authenticator

router = APIRouter()


@router.post("/api/vendor/order", response_model=ProductOut)
def create_product(
    product: ProductIn,
    repo: ProductQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(product, vendor_id=account_data["id"])
