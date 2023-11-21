from pydantic import BaseModel


class Review(BaseModel):
    buyer_id: str
    product_id: str
    rating: int
    comment: str
    sentiment: str
    createdAt: str
