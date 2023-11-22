from fastapi import APIRouter, Depends
from models.review import ReviewIn, ReviewOut, ReviewList
from queries.review import ReviewQueries
from authenticator import authenticator, AccountOut

router = APIRouter()


@router.post("/api/reviews", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    repo: ReviewQueries = Depends(),
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> ReviewOut:
    """
    Create a review
    """
    newReview: ReviewOut = repo.create(review)
    return newReview


@router.get("/api/reviews/buyer/{buyer_id}", response_model=ReviewList)
def get_reviews_by_buyer(
    buyer_id: str, repo: ReviewQueries = Depends()
) -> ReviewList:
    """
    Get all reviews posted by a buyer
    """
    return ReviewList(reviews=repo.get_all_by_buyer_id(buyer_id))


@router.get("/api/reviews/product/{product_id}", response_model=ReviewList)
def get_reviews_by_product(
    product_id: str, repo: ReviewQueries = Depends()
) -> ReviewList:
    """
    Get all reviews posted for a product
    """
    return ReviewList(
        reviews=repo.get_all_by_product_id(product_id=product_id)
    )
