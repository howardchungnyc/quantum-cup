from typing import List, Optional
from pydantic import BaseModel
from .users import AccountOut
from models.products import ProductOut
from models.orders import OrderOut


class Vendor(AccountOut):
    orders: Optional[List[OrderOut]]  # orders
    products: Optional[List[ProductOut]]  # for vendors


class VendorList(BaseModel):
    vendors: List[Vendor]
