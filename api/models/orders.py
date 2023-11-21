from pydantic import BaseModel


class Order(BaseModel):
    order_id: str
    status: str
    buyer_id: str
    vendor_id: str
    product_id: str
    quantity: int
    total: float
