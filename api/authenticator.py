import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import AccountQueries
from models.users import AccountOutWithHashedPassword, AccountOut


class CoffeeAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get user by username
        return accounts.get_one_by_username(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithHashedPassword):
        # Return the encrypted password
        return account.hashed_password

    def get_account_data_for_cookie(
        self, account: AccountOutWithHashedPassword
    ):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())


authenticator = CoffeeAuthenticator(os.environ["SIGNING_KEY"])
