from fastapi import FastAPI

# from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware
from routers import users, vendor, products, orders
from routers.authenticator import authenticator
from routers.review import router as review_router
from routers.search import router as search_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://quantum-cup-tonyspence-2c5d01037fd"
        + "46c3b59c1cc7f412c6037bbde2851.gitlab.io",
        "*",
    ],
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
app.include_router(orders.router, tags=["Orders"])


@app.get("/")
def root():
    return {"message": "You hit the root path!"}
