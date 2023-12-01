import React from "react";
import StarRating from "../StarRating/StarRating";
import ShowStars from "../ShowStars/ShowStars";
import "./ReviewTaker.css";


/**
 * React component for taking a review.
 *
 * @param {Function} onSubmit - The function to call when the review is submitted.
 * @returns {JSX.Element} - The component.
 * @note The onSubmit function should take a single argument, which is an object
 * with the following properties:
 *  - review: String
 *  - rating: Number
 */
function ReviewTaker({ onSubmit }) {
    const [review, setReview] = React.useState('');
    const [rating, setRating] = React.useState(0);
    const [submitted, setSubmitted] = React.useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            setSubmitted(true);
            onSubmit({ review, rating });
        }
    }

    return (
        <div id="rating-box">
            <h3>Your Review</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group mb-3 col-10 mx-auto">
                    {/* <label htmlFor="review">Review</label> */}
                    <textarea className="form-control" id="review" rows="3"
                        value={review} placeholder="Review" onChange={
                            (e) => setReview(e.target.value)} disabled={submitted}>
                    </textarea>
                </div>
                {submitted ?
                    <div className="form-group mb-2">
                        You rated:
                        <ShowStars rating={rating} />
                    </div>
                    :
                    <div>
                        <div className="form-group mb-2">
                            <label htmlFor="rating">Rate Product!</label>
                            <StarRating totalStars={5} initialRating={0}
                                onChange={(rating) => setRating(rating)} />
                        </div>
                        <button type="submit" className="btn">Submit</button>
                    </div>
                }
            </form>
        </div>
    );
}


export default ReviewTaker;
