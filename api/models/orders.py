from pydantic import BaseModel
from typing import List


class OrderIn(BaseModel):
    product_id: str
    buyer_id: str
    buyer_fullname: str
    vendor_id: str
    vendor_fullname: str
    product_name: str
    price: float
    unit: str
    quantity: int
    total: float


class OrderOut(BaseModel):
    id: str
    product_id: str
    status: str
    buyer_id: str
    buyer_fullname: str
    vendor_id: str
    vendor_fullname: str
    product_name: str
    price: float
    unit: str
    quantity: int
    total: float
    createdAt: str


class OrderList(BaseModel):
    orders: List[OrderOut]
