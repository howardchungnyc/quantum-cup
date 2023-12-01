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

If your endpoint needs to know who the person is, then include the
Headers/Authorization part.

## Implementing 'reviews' endpoint - 2023.11.21
### Routes
* Create new review - POST - /api/reviews
* Get list of review by product - GET - /api/reviews/product/{product_id}
* Get list of review by buyer - GET - /api/reviews/buyer/{buyer_id}

### Models
    - `buyer:` The buyer that wrote the review.
    - `product:` The product that was reviewed.
    - `rating:` The rating of the review. It can be a number between 1 and 5.
    - `comment:` The comment of the review.
    - `createdAt:` The date and time the review was created.
    - `sentiment:` The sentiment as analyzed by Azure Language Sentiment Analyzer.

### Implementation Notes
* The `sentiment` field is filled with 0 at the time of creation. Later on it is
  calculated by the backend using the Azure Language Sentiment Analyzer.
* The system must define a threshold for the `sentiment` field. If the sentiment
  is below the threshold, the review is not published.
* During the query of reviews by product, the system must filter out reviews that
  have a `sentiment` below the threshold.

## Debugging MongoDB pipelines - 2023.11.22
### Problem

I was trying to implement the `getReviewsByProduct` endpoint, but the pipeline
was not working. I was getting an empty list for Buyer and Vendor full names.

### Solution

I had to use the `$lookup` operator to join the `buyers` and `vendors`
collections with the `reviews` collection. The `$lookup` operator is similar
to a SQL join.
There was an additional problem with ObjectId, which I solved by using the
`$toObjectId` operator and targeting the the proper fields on the other
collections.

### Additional Notes
Too help debugging the pipeline, I used the "$$ROOT" operator to get the full
document. This is useful to see the intermediate results of the pipeline.

```python
"$project": {
    "_id": 0,
    ...
    "debug": "$$ROOT",
}
```


## Implementing Contextual Search - 2023.11.27
### Problem
Need to implement a mini search engine that can search for products by name,
description, and vendor name. The search engine must be able to do fuzzy search,
be easy to use, and be fast. Contextual search would be desirable, but it is not
mandatory.

### Solution
I decided to use Whoosh, a Python library for indexing and searching text. It
is easy to use and fast. It also supports fuzzy search, however, it does not
support contextual search. Elasticsearch would be a better choice for that, but
it is more complex to use and requires more resources.

Refer to the [implementation documentation](../docs/ContextualSearch.md) for
more details.
