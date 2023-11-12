# Development Issues
## Access to APIs from React FE blocked by CORS - 2023.11.11
- **Description:** Follow the gidelines below to enable CORS in the backend
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rest of your server code
```

## Endpoint Template - 2023.11.11
### «Human-readable of the endpoint»

* Endpoint path: «path to use»
* Endpoint method: «HTTP method»
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```
Mandatory fields are:

* Endpoint path
* Endpoint method
* Response
* Response shape

If your endpoint needs to know who the person is, then include the Headers/Authorization part.
