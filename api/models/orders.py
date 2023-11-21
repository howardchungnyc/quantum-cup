from pydantic import BaseModel
from bson.objectid import ObjectId


class Order(BaseModel):
    order_id: str
    status: str
    buyer_id: ObjectId
    vendor_id: ObjectId
    product_id: ObjectId
    quantity: int
    total: float
