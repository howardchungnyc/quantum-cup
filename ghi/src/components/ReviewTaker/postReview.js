

/**
 * Posts a review to the database.
 *
 * @param {Object} review - The review object. It should have the following
 * properties:
 *  - review: String
 *  - rating: Number
 * @param {*} product_id - The id of the product.
 * @param {*} quantumAuth - The authentication object.
 * @returns {Promise<Boolean>} - True if the review was posted successfully,
 *  false otherwise.
 */
async function postReview(review, product_id, quantumAuth) {
    const url = `${quantumAuth.baseUrl}/api/reviews`;
    const body = {
        comment: review.review,
        rating: review.rating,
        product_id: product_id
    };
    const options = {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
    const res = await fetch(url, options);
    return res.status === 200;
}


export default postReview;
