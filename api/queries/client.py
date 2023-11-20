from pymongo import MongoClient
import os

# get these from .env
DATABASE_URL = os.environ.get("DATABASE_URL", "")
MONGO_DB = os.environ.get("MONGO_DB", "")

client = MongoClient(DATABASE_URL)
db = client[MONGO_DB]


class Queries:
    @property
    def collection(self):
        return db[self.collection_name]
