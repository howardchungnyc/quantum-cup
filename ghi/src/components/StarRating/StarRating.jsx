import React, { useState } from 'react';


function StarRating({ totalStars, initialRating, onRatingChange }) {
    const [rating, setRating] = useState(initialRating || 0);

    const handleStarClick = (clickedRating) => {
        setRating(clickedRating);
        if (onRatingChange) {
            onRatingChange(clickedRating);
        }
    };

    return (
        <div>
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    filled={index < rating}
                    onClick={() => handleStarClick(index + 1)}
                />
            ))}
        </div>
    );
};

const Star = ({ filled, onClick }) => (
    <span onClick={onClick} className=
        {`${filled ? "checked" : ""} fa fa-star mx-1`}></span>
);

export default StarRating;
