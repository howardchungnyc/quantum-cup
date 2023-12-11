from models.orders import OrderIn, OrderOut, OrderList
from .client import Queries
import datetime
from bson import ObjectId
from fastapi import HTTPException


class DuplicateAccountError(ValueError):
    pass


class OrderQueries(Queries):
    collection_name = "orders"

    def create_order(self, order: OrderIn, account: dict) -> OrderOut:
        if account["role"] != "buyer":
            raise HTTPException(
                status_code=401, detail="Only buyers can create an order"
            )
        info = order.dict()
        info["status"] = "pending"
        now = datetime.datetime.utcnow()
        info["createdAt"] = now.strftime("%Y-%m-%d, %H:%M")
        self.collection.insert_one(info)
        info["id"] = str(info["_id"])
        return OrderOut(**info)

    def delete_order(self, order_id: str):
        order_object_id = ObjectId(order_id)

        order_to_delete = self.collection.find_one({"_id": order_object_id})
        if not order_to_delete:
            raise HTTPException(
                status_code=404, detail="Order not found in collection."
            )

        self.collection.update_one(
            {"_id": order_object_id}, {"$set": {"status": "cancelled"}}
        )

        return None

    def get_all_orders(self) -> OrderList:
        results = []
        for doc in self.collection.find({}):
            doc["id"] = str(doc["_id"])
            results.append(doc)
        return OrderList(orders=results)
