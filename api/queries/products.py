from models.products import ProductOut, ProductIn, ProductList
from .client import Queries
import logging


from fastapi import HTTPException
from bson import ObjectId


class DuplicateAccountError(ValueError):
    pass


# Class representing queries related to products
class ProductQueries(Queries):
    # MongoDB collection name for products
    collection_name = "products"

    def update_rating(self, product_id: str, rating: int) -> bool:
        """
        Update the rating of a product

        param: product_id: str - the id of the product to update
        param: rating: int - the rating to add to the product
        return: bool - True if the product was updated, False otherwise
        """
        result = self.collection.update_one(
            {"_id": ObjectId(product_id)},
            {"$inc": {"rating_count": 1, "rating_sum": rating}},
        )
        return result.modified_count == 1

    def create(self, product: ProductIn, vendor_id: str) -> ProductOut:
        info = product.dict()
        info["vendor_id"] = vendor_id
        info["rating_count"] = 0
        info["rating_sum"] = 0
        self.collection.insert_one(info)
        info["id"] = str(info["_id"])
        return ProductOut(**info)

    def delete(self, product_id: str):
        product_object_id = ObjectId(product_id)

        product_to_delete = self.collection.find_one(
            {"_id": product_object_id}
        )
        if not product_to_delete:
            raise HTTPException(
                status_code=404, detail="Product not found in the collection."
            )

        self.collection.delete_one({"_id": product_object_id})
        logging.info("Product deleted successfully.")

        return {
            "message": "Product deleted successfully.",
            "product_id": str(product_object_id),
        }

    def update(self, product_id: str, update_data: dict):
        filter_query = {"_id": ObjectId(product_id)}
        update_query = {"$set": update_data}
        result = self.collection.update_one(filter_query, update_query)
        if result.matched_count == 0:
            raise HTTPException(
                status_code=404, detail="Product not found in the collection."
            )
        return {
            "message": "Product updated successfully.",
            "product_id": product_id,
        }

    def get_all_products(self) -> ProductList:
        pipeline = [
            # new field vendor_id_object,
            # converting vendor_id to ObjectId
            {
                "$addFields": {
                    "vendor_id_object": {"$toObjectId": "$vendor_id"}
                }
            },
            # Perform a lookup to get details of
            # the vendor using vendor_id_object
            {
                "$lookup": {
                    "from": "accounts",
                    "localField": "vendor_id_object",
                    "foreignField": "_id",
                    "as": "vendor",
                }
            },
            # Add fields for vendor_fullname
            # and convert vendor_id_object to string
            {
                "$addFields": {
                    "vendor_fullname": {
                        "$arrayElemAt": ["$vendor.fullname", 0]
                    },
                    "vendor_id": {"$toString": "$vendor_id_object"},
                }
            },
            # Project to shape the final output
            {
                "$project": {
                    "_id": 0,
                    "id": {"$toString": "$_id"},
                    "name": "$name",
                    "description": "$description",
                    "image": "$image",
                    "unit": "$unit",
                    "price": "$price",
                    "rating_count": "$rating_count",
                    "rating_sum": "$rating_sum",
                    "vendor_id": "$vendor_id",
                    "vendor_name": "$vendor_fullname",
                }
            },
        ]

        results = list(self.collection.aggregate(pipeline))
        return ProductList(products=results)

    def get_one_product(self, product_id: str):
        # Use MongoDB  retrieve product information and its reviews

        pipeline = [
            # Match the product with the given product_id
            {"$match": {"_id": ObjectId(product_id)}},
            # Perform a lookup to get reviews related to the product
            {
                "$lookup": {
                    "from": "reviews",
                    "localField": "_id",
                    "foreignField": "product_id",
                    "as": "reviews",
                }
            },
            {
                "$addFields": {
                    "vendor_id_object": {"$toObjectId": "$vendor_id"}
                }
            },
            # Perform a lookup to get details of
            # the vendor using vendor_id_object
            {
                "$lookup": {
                    "from": "accounts",
                    "localField": "vendor_id_object",
                    "foreignField": "_id",
                    "as": "vendor",
                }
            },
            # Add fields for vendor_fullname
            # and convert vendor_id_object to string
            {
                "$addFields": {
                    "vendor_fullname": {
                        "$arrayElemAt": ["$vendor.fullname", 0]
                    },
                    "vendor_id": {"$toString": "$vendor_id_object"},
                }
            },
            {"$addFields": {"buyer_id_object": {"$toObjectId": "$buyer_id"}}},
            {
                "$addFields": {
                    "buyer_fullname": {"$arrayElemAt": ["$buyer.fullname", 0]},
                }
            },
            {
                "$lookup": {
                    "from": "accounts",
                    "localField": "buyer_id_object",
                    "foreignField": "fullname",
                    "as": "buyer",
                }
            },
            # Project to shape the final output
            {
                "$project": {
                    "_id": 0,
                    "id": {"$toString": "$_id"},
                    "name": "$name",
                    "description": "$description",
                    "image": "$image",
                    "unit": "$unit",
                    "price": "$price",
                    "rating_count": "$rating_count",
                    "rating_sum": "$rating_sum",
                    "vendor_id": {
                        "$toString": {"$arrayElemAt": ["$vendor._id", 0]}
                    },
                    "vendor_fullname": {
                        "$arrayElemAt": ["$vendor.fullname", 0]
                    },
                    "reviews": {
                        "$map": {
                            "input": "$reviews",
                            "as": "review",
                            "in": {
                                "id": {"$toString": "$$review._id"},
                                "comment": "$$review.comment",
                                "buyer_id": {"$toString": "$$review.buyer_id"},
                                "createdAt": "$$review.createdAt",
                            },
                        }
                    },
                }
            },
        ]

        result = list(self.collection.aggregate(pipeline))
        return result if result else None
