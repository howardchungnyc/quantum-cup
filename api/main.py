from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, buyers
from authenticator import authenticator

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
app.include_router(buyers.router, tags=["Buyer"])
