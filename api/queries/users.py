import os
from pymongo import MongoClient
from pydantic import BaseModel
from fastapi import HTTPException
from .passwd import hashPassword


DATABASE_URL: str | None = os.environ.get("DATABASE_URL")

class Error(BaseModel):
    detail: str

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
        with MongoClient(DATABASE_URL) as client:
            db = client["quantumcup"]
            usr_dict = user.dict()
            usr_dict.pop("role")
            # never store passwords in plain text, use a hash function
            usr_dict["password"] = hashPassword(usr_dict["password"])
            if user.role == "buyer":
                # check if the username already exists in the database
                if db.buyers.find_one({"username": user.username}):
                    raise HTTPException(status_code=400,
                                        detail="Username already exists")
                entry_id = db.buyers.insert_one(usr_dict).inserted_id
                return Buyer(id=str(entry_id), **usr_dict)
            else:
                # check if the username already exists in the database
                if db.vendors.find_one({"username": user.username}):
                    raise HTTPException(status_code=400,
                                        detail="Username already exists")
                entry_id = db.vendors.insert_one(usr_dict).inserted_id
                return Buyer(
                    id=str(entry_id), **usr_dict
                )  # use Buyer for consistency
