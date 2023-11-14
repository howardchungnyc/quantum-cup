from fastapi import APIRouter, Depends
from models import UserRegistration, Buyer, Error
from queries.users import UserRepository
from typing import Union

router = APIRouter()


@router.post("/login")
def login():
    pass


@router.post("/logout")
def logout():
    pass


@router.post("/signup", response_model=Union[Buyer, Error])
def signup(
    user: UserRegistration, repo: UserRepository = Depends()
) -> dict[str, str] | Buyer:
    return repo.create(user)
