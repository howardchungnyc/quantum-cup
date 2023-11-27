# Review Taker Module

This module is responsible for taking reviews from the user and sending them to the server.

This module is made up of the following components:
* The React component `ReviewTaker` which is responsible for taking reviews.
* The JavaScript code `postReview` which is responsible for sending reviews to the server.

## Usage

1. On your page import the `ReviewTaker` component and render it.
```jsx
import ReviewTaker from "../ReviewTaker/ReviewTaker";
import postReview from "../ReviewTaker/postReview";

. . .

    <div className="m-3">
        <ReviewTaker onSubmit={handleSubmitReview} />
    </div>

```

2. Create a function to handle the submission of the review.
```jsx
    const handleSubmitReview = async (review) => {
        postReview(review, prodID, quantumAuth)
            .then((res) => {
                console.log("Posting result:", res);
            })
            .catch((err) => {
                console.log("Posting error:", err);
            })
    }
```

## Notes

* The `ReviewTaker` component takes a function as a prop called `onSubmit`. This function is called when the user submits a review. The function is passed the review as an argument.
* The `postReview` function takes the review, the product ID and the quantum auth token as arguments. It returns a promise which resolves to true or false.
* The user must be authenticated to post a review. The `postReview` function will throw an error if the user is not authenticated.
