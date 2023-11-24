from models.vendor import VendorList, Vendor
from .client import Queries

from bson.objectid import ObjectId


class DuplicateAccountError(ValueError):
    pass


# Class representing queries related to user accounts
class VendorQueries(Queries):
    # MongoDB collection name for accounts
    collection_name = "accounts"

    def get_all_vendors(self) -> VendorList:
        # MongoDB query to get data
        results = []
        for doc in self.collection.find({"role": "vendor"}):
            doc["id"] = str(doc["_id"])
            results.append(Vendor(**doc))
        return results

    def get_one_vendor(self, vendor_id: str) -> Vendor:
        # MongoDB query to get data
        result = self.collection.find_one({"_id": ObjectId(vendor_id)})
        if result is None:
            return None
        result["id"] = str(result["_id"])
        return Vendor(**result)
