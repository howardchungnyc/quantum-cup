from typing import List, Optional
from pydantic import BaseModel
from .users import AccountOut
from models.products import ProductOut
from models.orders import Order


class Vendor(AccountOut):
    orders: Optional[List[Order]]  # orders
    products: Optional[List[ProductOut]]  # for vendors


class VendorList(BaseModel):
    vendors: List[Vendor]
