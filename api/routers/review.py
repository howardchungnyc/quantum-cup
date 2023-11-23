from fastapi import APIRouter, Depends
from models.review import (
    ReviewIn,
    ReviewOut,
    ReviewByProductList,
    ReviewByBuyerList,
)
from queries.review import ReviewQueries
from authenticator import authenticator

router = APIRouter()


@router.post("/api/reviews", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    repo: ReviewQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
) -> ReviewOut:
    """
    Create a review
    """
    newReview: ReviewOut = repo.create(review, buyer_id=account["id"])
    return newReview


@router.get("/api/reviews/buyer/{buyer_id}", response_model=ReviewByBuyerList)
def get_reviews_by_buyer(
    buyer_id: str, repo: ReviewQueries = Depends()
) -> ReviewByBuyerList:
    """
    Get all reviews posted by a buyer
    """
    return ReviewByBuyerList(
        reviews=repo.get_all_reviews_by_buyer_id(buyer_id)
    )


@router.get(
    "/api/reviews/product/{product_id}", response_model=ReviewByProductList
)
def get_reviews_by_product(
    product_id: str, repo: ReviewQueries = Depends()
) -> ReviewByProductList:
    """
    Get all reviews posted for a product
    """
    return ReviewByProductList(
        reviews=repo.get_all_reviews_by_product_id(product_id=product_id)
    )
