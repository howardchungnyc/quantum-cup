from pydantic import BaseModel
from bson.objectid import ObjectId


class Comment(BaseModel):
    comment: str
    rating: int
    product_id: ObjectId
    user_id: ObjectId
    sentiment: str
