from typing import List
from bson.objectid import ObjectId
from pydantic import BaseModel


class Vendor(BaseModel):
    user_id: ObjectId
    orders: List[ObjectId] = []  # orders
    products: List[ObjectId] = []  # for vendors
