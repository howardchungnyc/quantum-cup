from pydantic import BaseModel


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
    rating: int
    vendor_id: str
