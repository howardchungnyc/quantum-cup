# The Reviews Feature

## Introduction
The reviews feature is a feature that allows buyers to write reviews for products
that they have bought. The reviews are displayed on the product page and can be
seen by anyone.

## Database Schema
The database schema for the reviews feature is as follows:

```json
{
  "buyer_id": "string",
  "product_id": "string",
  "rating": 0,
  "comment": "string",
  "createdAt": "string",
  "id": "string",
  "sentiment_score": float
}
```

### Implementation Notes
* The backend populates the `createdAt` field with the current UTC date and time
  at the time of creation. Later on it is not changed.
* The `sentiment` field is filled with 0 at the time of creation. Later on it is
  calculated by the backend using the Azure Language Sentiment Analyzer.
* The system must define a threshold for the `sentiment` field. If the sentiment
  is below the threshold, the review is not published.
* During the query of reviews by product, the system must filter out reviews that
  have a `sentiment` below the threshold.

## API Endpoints
Please refer to the [Review Endpoints](../README.md#review-endpoints) document
for more information.
