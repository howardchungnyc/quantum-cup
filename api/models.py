from pydantic import BaseModel


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

