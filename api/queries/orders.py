from models.orders import OrderIn, OrderOut, OrderList
from .client import Queries
from fastapi import HTTPException
import datetime


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

    def get_all_orders(self) -> OrderList:
        results = []
        for doc in self.collection.find({}):
            doc["id"] = str(doc["_id"])
            results.append(doc)
        return OrderList(orders=results)
