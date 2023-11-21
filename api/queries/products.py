from models.products import ProductOut, ProductIn
from .client import Queries


class DuplicateAccountError(ValueError):
    pass


# Class representing queries related to user accounts
class ProductQueries(Queries):
    # MongoDB collection name for accounts
    collection_name = "products"

    def create(self, product: ProductIn, vendor_id: str) -> ProductOut:
        info = product.dict()
        info["vendor_id"] = vendor_id
        self.collection.insert_one(info)
        info["id"] = str(info["_id"])
        return ProductOut(**info)
