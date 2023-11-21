from pydantic import BaseModel


class Comment(BaseModel):
    comment: str
    rating: int
    product_id: str
    user_id: str
    sentiment: str
