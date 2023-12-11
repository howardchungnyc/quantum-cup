from fastapi import APIRouter, Depends
from models.orders import OrderIn, OrderOut, OrderList
from queries.orders import OrderQueries
from .authenticator import authenticator

router = APIRouter()


@router.post("/api/orders/create", response_model=OrderOut)
def create_order(
    order: OrderIn,
    repo: OrderQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create_order(order, account=account_data)


@router.delete("/api/orders/{order_id}", response_model=None)
def delete_order(
    order_id: str,
    repo: OrderQueries = Depends(),
) -> None:
    return repo.delete_order(order_id)


@router.get("/api/orders")
def list_orders(repo: OrderQueries = Depends()) -> OrderList:
    return repo.get_all_orders()
