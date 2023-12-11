from pydantic import BaseModel
from typing import List, Optional


class ProductIn(BaseModel):
    name: str
    description: str
    image: str
    unit: str
    price: float


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


class ProductList(BaseModel):
    products: List[ProductOut]


class ReviewForProductDetail(BaseModel):
    id: str
    comment: str
    buyer_id: str
    createdAt: str
    sentiment_score: float


class ProductDetail(BaseModel):
    id: str
    name: str
    description: str
    image: str
    unit: str
    price: float
    rating_count: int
    rating_sum: int
    vendor_id: str
    vendor_fullname: Optional[str]
    reviews: List[ReviewForProductDetail]
