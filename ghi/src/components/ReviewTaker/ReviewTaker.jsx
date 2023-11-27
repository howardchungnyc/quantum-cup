import React from "react";
import StarRating from "../StarRating/StarRating";


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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit({ review, rating });
    }

    return (
        <div>
            <h3>Your Review</h3>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group mb-3">
                    {/* <label htmlFor="review">Review</label> */}
                    <textarea className="form-control" id="review" rows="3"
                        value={review} placeholder="Review" onChange={
                            (e) => setReview(e.target.value)}></textarea>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="rating">Rating</label>
                    <StarRating totalStars={5} initialRating={0}
                        onChange={(rating) => setRating(rating)} />
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
}


export default ReviewTaker;
