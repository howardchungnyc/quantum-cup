from pydantic import BaseModel
from typing import Any
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
    product_id: str
    rating: int
    comment: str


class ReviewOut(ReviewIn):
    id: str
    createdAt: str


class Review(ReviewOut):
    id: PydanticObjectId
    sentiment_score: str


class ReviewList(BaseModel):
    reviews: list[ReviewOut]


class ReviewByProduct(BaseModel):
    id: str | Any
    buyer_id: str | Any
    buyer_fullname: str | list[str]
    product_id: str | Any
    product_name: str | list[str]
    product_description: str | list[str]
    vendor_id: str | list[str]
    vendor_fullname: str | list[str]
    rating: int
    comment: str
    createdAt: str

    @classmethod
    def from_array(cls, data: str | list[str]) -> str:
        if type(data) is list:
            return data[0] if len(data) > 0 else ""
        return str(data)

    def __init__(self, **data):
        super().__init__(**data)
        self.id = str(self.id)
        self.buyer_id = str(self.buyer_id)
        self.buyer_fullname = self.from_array(self.buyer_fullname)
        self.product_id = str(self.product_id)
        self.product_name = self.from_array(self.product_name)
        self.product_description = self.from_array(self.product_description)
        self.vendor_id = self.from_array(self.vendor_id)
        self.vendor_fullname = self.from_array(self.vendor_fullname)


class ReviewByProductList(BaseModel):
    reviews: list[ReviewByProduct]


class ReviewByBuyer(BaseModel):
    id: str | Any
    buyer_id: str | Any
    buyer_fullname: str | list[str]
    product_id: str | Any
    product_name: str | list[str]
    product_description: str | list[str]
    vendor_id: str | list[str]
    vendor_fullname: str | list[str]
    rating: int
    comment: str
    createdAt: str

    @classmethod
    def from_array(cls, data: str | list[str]) -> str:
        if type(data) is list:
            return data[0] if len(data) > 0 else ""
        return str(data)

    def __init__(self, **data):
        super().__init__(**data)
        self.id = str(self.id)
        self.buyer_id = str(self.buyer_id)
        self.buyer_fullname = self.from_array(self.buyer_fullname)
        self.product_id = str(self.product_id)
        self.product_name = self.from_array(self.product_name)
        self.product_description = self.from_array(self.product_description)
        self.vendor_id = self.from_array(self.vendor_id)
        self.vendor_fullname = self.from_array(self.vendor_fullname)


class ReviewByBuyerList(BaseModel):
    reviews: list[ReviewByBuyer]
