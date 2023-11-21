from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class Error(BaseModel):
    detail: str


# Data model for the user registration POST request
class AccountIn(BaseModel):
    username: str
    password: str
    email: str
    fullname: str
    street: str
    city: str
    state: str
    zipcode: int
    role: str


# Response for POST
class AccountOut(BaseModel):
    id: str
    username: str
    email: str
    fullname: str
    street: str
    city: str
    state: str
    zipcode: int
    role: str


class AccountToken(Token):
    account: AccountOut


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str
