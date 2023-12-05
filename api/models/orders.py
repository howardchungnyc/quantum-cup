from pydantic import BaseModel
from typing import List


class OrderIn(BaseModel):
    product_id: str
    buyer_id: str
    vendor_id: str
    product_name: str
    price: float
    unit: str
    quantity: int
    total: float


class OrderOut(BaseModel):
    product_id: str
    status: str
    buyer_id: str
    vendor_id: str
    product_name: str
    price: float
    unit: str
    quantity: int
    total: float
    createdAt: str


class OrderList(BaseModel):
    orders: List[OrderOut]
