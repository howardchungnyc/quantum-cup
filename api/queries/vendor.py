from models.vendor import VendorList, Vendor
from .client import Queries

from bson.objectid import ObjectId
from typing import List

from fastapi import HTTPException


class DuplicateAccountError(ValueError):
    pass


# Class representing queries related to user accounts
class VendorQueries(Queries):
    # MongoDB collection name for accounts
    collection_name = "accounts"

    def get_all_vendors(self) -> VendorList | List[None]:
        try:
            # MongoDB query to get data
            results = []
            for doc in self.collection.find({"role": "vendor"}):
                doc["id"] = str(doc["_id"])
                results.append(Vendor(**doc))
            return results
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error retrieving vendors: {str(e)}"
            )

    def get_one_vendor(self, vendor_id: str) -> Vendor | None:
        try:
            # MongoDB query to get data
            result = self.collection.find_one({"_id": ObjectId(vendor_id)})
            if result is None:
                return None
            result["id"] = str(result["_id"])
            return Vendor(**result)
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Error retrieving vendor: {str(e)}"
            )
