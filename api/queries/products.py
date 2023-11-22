from models.products import ProductOut, ProductIn, ProductList
from .client import Queries

from bson.objectid import ObjectId


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

    def get_all_products(self) -> ProductList:
        # MongoDB query to get data
        results = []
        for doc in self.collection.find():
            doc["id"] = str(doc["_id"])
            results.append(ProductOut(**doc))
        return results

    def get_one_product(self, product_id: str) -> ProductOut:
        # MongoDB query to get data
        result = self.collection.find_one({"_id": ObjectId(product_id)})
        if result is None:
            return None
        result["id"] = str(result["_id"])
        return ProductOut(**result)
