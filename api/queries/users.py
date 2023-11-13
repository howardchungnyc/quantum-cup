import hashlib
import os
from pymongo import MongoClient
from pydantic import BaseModel

DATABASE_URL: str | None = os.environ.get("DATABASE_URL")

class User(BaseModel):
    username: str
    password: str
    email: str
    fullname: str
    street: str
    city: str
    state: str
    zipcode: int


# Data model for the user registration POST request
class UserRegistration(User):
    role: str


class Buyer(User):
    id: str


class Vendor(User):
    id: str


class UserRepository:
    def create(self, user: UserRegistration) -> dict[str, str] | Buyer:
        """
        Creates a new user in the database

        :param user: UserRegistration object
        :return: User object
        """
        client = None
        try:
            client = MongoClient(DATABASE_URL)
            db = client["quantumcup"]
            usr_dict = user.dict()
            usr_dict.pop("role")
            # never store passwords in plain text, use a hash function
            usr_dict["password"] = hashlib.sha512(
                usr_dict["password"].encode()
            ).hexdigest()
            if user.role == "buyer":
                # check if the username already exists in the database
                if db.buyers.find_one({"username": user.username}):
                    return {"detail": "Username already exists"}
                entry_id = db.buyers.insert_one(usr_dict).inserted_id
                return Buyer(id=str(entry_id), **usr_dict)
            else:
                # check if the username already exists in the database
                if db.vendors.find_one({"username": user.username}):
                    return {"detail": "Username already exists"}
                entry_id = db.vendors.insert_one(usr_dict).inserted_id
                return Buyer(
                    id=str(entry_id), **usr_dict
                )  # use Buyer for consistency
        except Exception as e:
            return {"detail": str(e)}
        finally:
            if client is not None:
                client.close()
