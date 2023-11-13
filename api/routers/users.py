from fastapi import APIRouter, Depends
from queries.users import UserRegistration, UserRepository, Buyer

router = APIRouter()


@router.post("/login")
def login():
    pass


@router.post("/logout")
def logout():
    pass


@router.post("/signup")
def signup(
    user: UserRegistration, repo: UserRepository = Depends()
) -> dict[str, str] | Buyer:
    res: dict[str, str] | Buyer = repo.create(user)
    return res
