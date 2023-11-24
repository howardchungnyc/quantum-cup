import React from "react";

function ShowStars({ rating }) {
    return (
        <span className="mx-2">
            {[0, 1, 2, 3, 4].map((el) =>
                <span key={el}
                    className={`fa fa-star mx-1 ${rating > el ? "checked" : ""}`}>
                </span>
            )}
        </span>
    )
}

export default ShowStars;
