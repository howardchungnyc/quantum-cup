# Front End Authentication

## Introduction
The front end authentication is a simple authentication system that uses a JWT
token to authenticate users. The token is stored in the local storage of the
browser and is used to authenticate the user on the backend.

## Authentication Flow
The authentication flow is as follows:
### Login in
* The user selects the role (buyer or vendor) and enters their username and
  password into the login form.
* The login form sends a POST request to the `/token` endpoint with the
  username and password and role in the body of the request.
* The backend validates the username and password and returns a JWT token.
* The frontend stores the JWT token along with the account information in the
  local storage of the browser.
* The frontend redirects the user to the role-related home page.

### Logout
* The user clicks on the logout button.
* The logout button sends a DELETE request to the `/token` endpoint with the
  JWT token in the body of the request.
* The frontend removes the JWT token and account information from the local
  storage of the browser.
* The frontend redirects the user to the login page.

## The props object - `quantumAuth`
The `quantumAuth` object is a prop that is passed to all the pages that require
authentication. It contains the following fields:
```javascript
  const quantumAuth = {
    isAuthenticated, // Function that returns true if the user is authenticated
    setAuthentication, // Function that sets the authentication state
    baseUrl, // The base URL of the backend (string)
    getAuthentication // Function that returns the authentication state (object)
  };
```

### The authentication state object
```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "username": "string",
    "email": "string",
    "fullname": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "zipcode": 0,
    "role": "string"
  }
}
```
Developers of the frontend should use the `quantumAuth` object to check if the
user is authenticated and to get the authentication state.

