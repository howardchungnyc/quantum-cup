from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models.review import (
    ReviewIn,
    ReviewOut,
    ReviewByProduct,
    ReviewByBuyer,
)
import datetime
from .products import ProductQueries
from .app import analyze_sentiment
from fastapi import HTTPException


class ReviewQueries(Queries):
    collection_name = "reviews"

    def create(self, reviewIn: ReviewIn, account: dict) -> ReviewOut:
        if account["role"] != "buyer":
            raise HTTPException(
                status_code=401,
                detail="Only buyers can post reviews",
            )
        props = reviewIn.dict()
        sentiment_obj = analyze_sentiment(props["comment"])
        sentiment_result= sentiment_obj["results"][0]
        props["buyer_id"] = account["id"]
        props["product_id"] = ObjectId(props["product_id"])
        props["sentiment_score"] = sentiment_result
        now = datetime.datetime.utcnow()
        props["createdAt"] = now.strftime("%Y-%m-%d, %H:%M")
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        props["buyer_id"] = str(props["buyer_id"])
        props["product_id"] = str(props["product_id"])
        if (
            ProductQueries().update_rating(
                props["product_id"], props["rating"]
            )
            is False
        ):
            # log error
            print("Error updating product rating")
        return ReviewOut(**props)

    def delete(self, review_id: str) -> None:
        self.collection.delete_one(
            {
                "_id": ObjectId(review_id),
            }
        )

    def get_all_reviews_by_product_id(
        self, product_id: str
    ) -> List[ReviewByProduct]:
        """
        Get all reviews posted for a product

        Aggregate information about the buyer's (fullname) that posted the
        review, the product (name, description) that the review is about,
        and the vendor (fullname) that sold the product.
        """
        results = []
        for doc in self.collection.aggregate(
            [
                {
                    "$match": {
                        "product_id": ObjectId(product_id),
                    }
                },
                {
                    "$lookup": {
                        "from": "products",
                        "localField": "product_id",
                        "foreignField": "_id",
                        "as": "product",
                    }
                },
                {
                    "$set": {
                        "buyer_id": {
                            "$toObjectId": "$buyer_id",
                        },
                    }
                },
                {
                    "$lookup": {
                        "from": "accounts",
                        "localField": "buyer_id",
                        "foreignField": "_id",
                        "as": "buyer",
                    }
                },
                {
                    "$set": {
                        "vendor_id": {
                            "$arrayElemAt": ["$product.vendor_id", 0],
                        },
                    }
                },
                {
                    "$set": {
                        "vendor_id": {
                            "$toObjectId": "$vendor_id",
                        },
                    }
                },
                {
                    "$lookup": {
                        "from": "accounts",
                        "localField": "vendor_id",
                        "foreignField": "_id",
                        "as": "vendor",
                    }
                },
                {
                    "$project": {
                        "_id": 0,
                        "id": "$_id",
                        "buyer_id": "$buyer_id",
                        "buyer_fullname": "$buyer.fullname",
                        "product_id": "$product_id",
                        "product_name": "$product.name",
                        "product_description": "$product.description",
                        "vendor_id": "$product.vendor_id",
                        "vendor_fullname": "$vendor.fullname",
                        "rating": "$rating",
                        "comment": "$comment",
                        "createdAt": "$createdAt",
                    }
                },
                {"$sort": {"createdAt": -1}},
            ]
        ):
            obj = ReviewByProduct(**doc)
            results.append(ReviewByProduct(**obj.dict()))
        return results

    def get_all_reviews_by_buyer_id(
        self, buyer_id: str
    ) -> List[ReviewByBuyer]:
        """
        Get all reviews posted by a buyer

        Aggregate information about the buyer's (fullname) that posted the
        review, the product (name, description) that the review is about,
        and the vendor (fullname) that sold the product.
        """
        results = []
        for doc in self.collection.aggregate(
            [
                {
                    "$match": {
                        "buyer_id": (buyer_id),
                    }
                },
                {
                    "$lookup": {
                        "from": "products",
                        "localField": "product_id",
                        "foreignField": "_id",
                        "as": "product",
                    }
                },
                {
                    "$set": {
                        "buyer_id": {
                            "$toObjectId": "$buyer_id",
                        },
                    }
                },
                {
                    "$lookup": {
                        "from": "accounts",
                        "localField": "buyer_id",
                        "foreignField": "_id",
                        "as": "buyer",
                    }
                },
                {
                    "$set": {
                        "vendor_id": {
                            "$arrayElemAt": ["$product.vendor_id", 0],
                        },
                    }
                },
                {
                    "$set": {
                        "vendor_id": {
                            "$toObjectId": "$vendor_id",
                        },
                    }
                },
                {
                    "$lookup": {
                        "from": "accounts",
                        "localField": "vendor_id",
                        "foreignField": "_id",
                        "as": "vendor",
                    }
                },
                {
                    "$project": {
                        "_id": 0,
                        "id": "$_id",
                        "buyer_id": "$buyer_id",
                        "buyer_fullname": "$buyer.fullname",
                        "product_id": "$product_id",
                        "product_name": "$product.name",
                        "product_description": "$product.description",
                        "vendor_id": "$product.vendor_id",
                        "vendor_fullname": "$vendor.fullname",
                        "rating": "$rating",
                        "comment": "$comment",
                        "createdAt": "$createdAt",
                    }
                },
                {"$sort": {"createdAt": -1}},
            ]
        ):
            obj = ReviewByBuyer(**doc)
            results.append(ReviewByBuyer(**obj.dict()))
        return results
