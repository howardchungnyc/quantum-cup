import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReviewListCard from "../components/ReviewListCard/ReviewListCard";



function BuyerReviews({ setAlert, quantumAuth }) {
    const [reviewList, setReviewList] = useState([]);
    const navigate = useNavigate();

    /**
     * Get a list of all reviews for a buyer.
     *
     * The endpoint is /api/reviews/buyer/{buyer_id}
     * The response is:
     * {
     *   "reviews": [
     *     {
     *       "id": "string",
     *       "buyer_id": "string",
     *       "buyer_fullname": "string",
     *       "product_id": "string",
     *       "product_name": "string",
     *       "product_description": "string",
     *       "vendor_id": "string",
     *       "vendor_fullname": "string",
     *       "rating": 0,
     *       "comment": "string",
     *       "createdAt": "string"
     *     }
     *   ]
     * }
     * @returns A list of reviews for a buyer.
     */
    async function getBuyerReviews() {
        const auth = quantumAuth.getAuthentication();
        if (!auth) return navigate('/');
        const url = quantumAuth.baseUrl + "/api/reviews/buyer/" + auth.account.id;
        const res = await fetch(url, { method: "get", credentials: "include" });
        if (res.status !== 200) {
            setAlert("Error getting reviews", false);
            return null;
        }
        const reviews = await res.json();
        setReviewList(reviews);
        return reviews;
    }

    useEffect(() => {
        getBuyerReviews();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // An empty dependency array means this effect will only run once

    async function handleCardOnClick(e) {
        e.preventDefault();
        if (e.target.name === 'delete') {
            const url = quantumAuth.baseUrl + "/api/reviews/" + e.target.dataset.id;
            const res = await fetch(url, { method: "delete", credentials: "include" });
            getBuyerReviews();
            if (res.status !== 200) {
                setAlert("Error deleting review", false);
            }
        }
    }

    return (
        <div className="container">
            <h1 className="mb-4">Your Reviews</h1>
            <main>
                {reviewList && reviewList.reviews && reviewList.reviews.map((review) => (
                    <ReviewListCard key={review.id} review={review} onClick={handleCardOnClick} />
                ))}
                {(!reviewList || !reviewList.reviews || reviewList.reviews.length === 0) &&
                    <h3 className="text-center my-5">You have no reviews</h3>
                }
            </main>
        </div>
    );
}

export default BuyerReviews;
