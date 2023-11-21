from bson.objectid import ObjectId
from pydantic import BaseModel


class Product(BaseModel):
    name: str
    description: str
    image: str
    unit: str
    price: float
    rating: int  # average rating
    comments: list[ObjectId] = []
    vendor_id: ObjectId
