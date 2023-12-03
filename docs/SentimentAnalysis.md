# Implementing Contextual Search
## Problem
- Vendors can receive a large volume of customer feedback in the form of reviews, comments. Manually analyzing this data can be time-consuming and impractical.
- Aide Vendors to manage their online reputation effectively.
## Solution
We are using the Sentiment Analysis with the AI services offered by Azure. The sentiment analysis feature provides sentiment labels (such as "negative", "neutral" and "positive") based on the highest confidence score found by the service at a sentence and document-level. This feature also returns confidence scores between 0 and 1 for each document & sentences within it for positive, neutral and negative sentiment.  We are using only the negative rating at this time.
- Sentiment analysis automates the process of understanding whether feedback is positive, negative, or neutral, allowing businesses to quickly identify areas of improvement or success.
- We are currently filtering out comments with a negative score that is less than 0.49.

## Back-end Implementation
### Additional Notes 
I have implemented a function in the app.py that is called in the create review query :
- The function takes in a comment(sendText) from users as they are posting a review. This is the text we want to analyze for sentiment.
- We send the user's comment to Azure Text Analytics to figure out if it's positive, negative, or neutral.
- We organize the results into a nice format pulling out only the negative score. we store this in the review's collection in the  'sentiment_score' field

### Implementation Notes

#### Schema
The sentiment_score field is included in the schema for the reviews which is defined as follows:

```python
{

    "product_id": "str"
    "rating": "int"
    "comment": "str"
    "id": "str"
    "createdAt": "str"
    "id": "PydanticObjectId"
    "sentiment_score": "float"
}
```

This is the format of the documents that will be returned by the
when querying reviews


## Front-end Implementation
### Functional Description
* when listing all reviews on the product detail page, we filter out all negative scores that are > .49.

