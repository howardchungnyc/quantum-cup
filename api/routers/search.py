from fastapi import APIRouter, Depends, Request
from models.search import SearchMatchList, SearchItem, SearchItemIn
from queries.search import SearchQueries
from authenticator import authenticator
import os
import shutil

router = APIRouter()

# Get the environment variable INDEX_DB_NAME, check if there is a directory
# with that name and remove it if it exists. This is to ensure that the
# search index is always empty when the application starts.
db_name: str | None = os.environ.get("INDEX_DB_NAME")
if db_name is not None and os.path.exists(db_name):
    shutil.rmtree(db_name)


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
