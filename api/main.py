from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, vendor, products
from authenticator import authenticator
from routers.review import router as review_router
from routers.search import router as search_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, tags=["Auth"])
app.include_router(authenticator.router, tags=["Auth"])
app.include_router(review_router, tags=["Reviews"])
app.include_router(vendor.router, tags=["Vendors"])
app.include_router(products.router, tags=["Products"])
app.include_router(search_router, tags=["Search"])
