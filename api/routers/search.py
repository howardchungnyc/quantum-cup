from fastapi import APIRouter, Depends, Request
from models.search import SearchMatchList, SearchItem, SearchItemIn
from queries.search import SearchQueries
from authenticator import authenticator

router = APIRouter()


@router.get("/api/search", response_model=SearchMatchList)
async def search(
    request: Request, search_ops: SearchQueries = Depends()
) -> SearchMatchList:
    # Extract query string parameters from request
    query: str | None = request.query_params.get("q")
    sel: str | None = request.query_params.get("sel")
    return search_ops.search(query=query, sel=sel)


@router.post("/api/search", response_model=SearchItem)
async def update_index(
    item: SearchItemIn,
    search_ops: SearchQueries = Depends(),
    account: dict = Depends(authenticator.get_current_account_data),
) -> SearchItem:
    """
    Add a new product to the search index
    """
    newItem = search_ops.update_index(item, account)
    return newItem
