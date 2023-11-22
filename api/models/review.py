from pydantic import BaseModel
from bson.objectid import ObjectId


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId | str:
        if value:
            try:
                ObjectId(value)
            except Exception as e:
                raise ValueError(f"Not a valid object id: {value} - {e}")
        return value


class ReviewIn(BaseModel):
    buyer_id: str
    product_id: str
    rating: int
    comment: str


class ReviewOut(ReviewIn):
    id: str
    createdAt: str


class Review(ReviewOut):
    id: PydanticObjectId
    sentiment_score: float


class ReviewList(BaseModel):
    reviews: list[ReviewOut]
