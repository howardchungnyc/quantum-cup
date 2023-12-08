import React from "react";
import ShowStars from "../ShowStars/ShowStars";
import "./ReviewListCard.css";

function ReviewListCard({ review, onClick }) {
    return (
        <div className="rev-card">
            <div className="d-flex">
                <div className="col-3">
                    <h5>{review.product_name}</h5>
                    <h6 className="text-muted">{review.vendor_fullname}</h6>
                </div>
                <div className="col-9 d-flex flex-column flex-md-row align-items-center">
                    <div className="col-md-4">
                        <ShowStars rating={review.rating} />
                    </div>
                    <div className="col-md-5">
                        {review.comment}
                    </div>
                    <div className="d-flex justify-content-end col-md-3">
                        <div>
                            <button onClick={onClick} className="btn"
                                name="delete" data-id={review.id}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewListCard;
