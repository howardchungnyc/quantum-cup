from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models.review import ReviewIn, ReviewOut
import datetime


class ReviewQueries(Queries):
    collection_name = "reviews"

    def create(self, reviewIn: ReviewIn) -> ReviewOut:
        props = reviewIn.dict()
        props["buyer_id"] = ObjectId(props["buyer_id"])
        props["product_id"] = ObjectId(props["product_id"])
        props["sentiment_score"] = 0
        now = datetime.datetime.utcnow()
        props["createdAt"] = now.strftime("%Y-%m-%d, %H:%M")
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        props["buyer_id"] = str(props["buyer_id"])
        props["product_id"] = str(props["product_id"])
        return ReviewOut(**props)

    def delete(self, review_id: str) -> None:
        self.collection.delete_one(
            {
                "_id": ObjectId(review_id),
            }
        )

    def get_all_by_product_id(self, product_id: str) -> List[ReviewOut]:
        result = self.collection.aggregate(
            [
                {
                    "$match": {
                        "product_id": ObjectId(product_id),
                    }
                },
                {"$sort": {"createdAt": -1}},
            ]
        )
        reviewPropsList = list(result)
        for reviewProps in reviewPropsList:
            reviewProps["id"] = str(reviewProps["_id"])
            reviewProps["buyer_id"] = str(reviewProps["buyer_id"])
            reviewProps["product_id"] = str(reviewProps["product_id"])
        return [ReviewOut(**review) for review in reviewPropsList]

    def get_all_by_buyer_id(self, buyer_id: str) -> List[ReviewOut]:
        result = self.collection.aggregate(
            [
                {
                    "$match": {
                        "buyer_id": ObjectId(buyer_id),
                    }
                },
                {"$sort": {"createdAt": -1}},
            ]
        )
        reviewPropsList = list(result)
        for reviewProps in reviewPropsList:
            reviewProps["id"] = str(reviewProps["_id"])
            reviewProps["buyer_id"] = str(reviewProps["buyer_id"])
            reviewProps["product_id"] = str(reviewProps["product_id"])
        return [ReviewOut(**review) for review in reviewPropsList]
