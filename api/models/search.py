from pydantic import BaseModel
from typing import List


class SearchMatchIn(BaseModel):
    product_id: str
    product: str
    description: str
    vendor_id: str
    vendor_name: str


class SearchItemIn(SearchMatchIn):
    pass


class SearchItem(SearchMatchIn):
    pass


class SearchMatchList(BaseModel):
    matches: List[SearchMatchIn]
