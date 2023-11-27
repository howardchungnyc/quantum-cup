from pydantic import BaseModel
from typing import List, Optional


class ProductIn(BaseModel):
    name: str
    description: str
    image: str
    unit: str
    price: float
    rating: int


class ProductOut(BaseModel):
    id: str
    name: str
    description: str
    image: str
    unit: str
    price: float
    rating_count: int
    rating_sum: int
    vendor_id: str
    vendor_name: Optional[str]
    review_id: Optional[str]


class ProductList(BaseModel):
    products: List[ProductOut]
