import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './ProductHighlight.css';
import ShowStars from "../ShowStars/ShowStars";
import ReviewTaker from "../ReviewTaker/ReviewTaker";
import postReview from "../ReviewTaker/postReview";

const DEFAULT_VENDOR = "Quantum Inc.";
const DEFAULT_PRODUCT = "Quantum Cup App";
const DEFAULT_IMAGE = "img/logo_light_bg.png";
const DEFAULT_DESCRIPTION = "Buy the best coffee in the world and connect " +
    "with vendors through the Quantum Cup app. Rate and review to build our " +
    "coffee community.";
const DEFAULT_RATING = 4;


function ProductHighlight({ quantumAuth, handleClick }) {
    const [prodID, setProdID] = useState(0);
    const [name, setName] = useState(DEFAULT_PRODUCT);
    const [image, setImage] = useState(DEFAULT_IMAGE);
    const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
    const [vendor, setVendor] = useState(DEFAULT_VENDOR);
    const [vendorId, setVendorId] = useState("");
    const [rating, setRating] = useState(DEFAULT_RATING);
    const [reviews, setReviews] = useState(0);
    const [totalRating, setTotalRating] = useState(0);
    const [providedReview, setProvidedReview] = useState(false);
    const [product, setProduct] = useState({});


    useEffect(() => {
        async function getAHighlighProduct() {
            /*
            - Get a random product from the server
            - Set the product, image, description, vendor, and rating
            - If there is an error, set the product to the default values
            The data comes in the following format:
            {
                "products": [
                    {
                        "id": "655e53dd7cfbbffeb64798a4",
                        "name": "Brazilian Coffee",
                        "description": "Flavor that appeals to all",
                        "image": "string",
                        "unit": "lb",
                        "price": 50,
                        "rating": 5,
                        "vendor_id": "655e52577cfbbffeb64798a3"
                    }
                ]
            }
            */
            const url = quantumAuth.baseUrl + '/api/products';
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.products && data.products.length > 0) {
                    // get a random product
                    const randomIndex = Math.floor(Math.random() *
                        data.products.length);
                    const product = data.products[randomIndex];
                    setProduct(product);
                    setName(product.name);
                    setImage(product.image);
                    setDescription(product.description);
                    setVendor(product.vendor_name);
                    setVendorId(product.vendor_id);
                    setTotalRating(product.rating_sum || 0);
                    setRating(product.rating_count ?
                        Math.round(product.rating_sum / product.rating_count) :
                        0);
                    setReviews(product.rating_count || 0);
                    setProdID(product.id);
                } else {
                    throw new Error("No products found");
                }
            } catch (e) {
                setName(DEFAULT_PRODUCT);
                setImage(DEFAULT_IMAGE);
                setDescription(DEFAULT_DESCRIPTION);
                setVendor(DEFAULT_VENDOR);
                setRating(DEFAULT_RATING);
            }
        }
        getAHighlighProduct();
    }, [quantumAuth.baseUrl]);


    const handleSubmitReview = async (review) => {
        postReview(review, prodID, quantumAuth)
            .catch((err) => {
                console.log("ProductHighligh - Posting error:", err);
            })
        const newTotalRating = totalRating + review.rating;
        const newReviews = reviews + 1;
        setReviews(newReviews);
        setRating(Math.round(newTotalRating / newReviews));
    }

    return (
        <div className="d-flex flex-column">
            <div className="image-container">
                <img id="highlight-img" src={image} alt="Product" />
                <div className="text-container">
                    <h4>{name}</h4>
                    <p className="mb-4">by {vendorId !== "" ?
                        <a className="vendor-link" href={`/vendor/${vendorId}`}>{vendor}</a> :
                        vendor}
                    </p>
                    <p>{description}</p>
                </div>
            </div>
            {/* Use stars to rate: */}
            <div className="m-3 d-flex flex-column align-items-end">
                <div className="my-2">
                    Rated:
                    <ShowStars rating={rating} />
                    <p>
                        Out of {reviews} {reviews === 1 ? "review" : "reviews"}
                    </p>

                </div>
                <div className="mx-2">
                    <Link to={`/buyer/orderform`}>
                        <button onClick={() => handleClick({ product })}
                            className="btn btn-lg me-3">Buy Now</button>
                    </Link>
                    {!providedReview &&
                        <button onClick={() => setProvidedReview(true)}
                            className="btn btn-lg">Review</button>
                    }
                </div>
            </div>
            {providedReview &&
                <div className="m-3">
                    <ReviewTaker onSubmit={handleSubmitReview} />
                </div>
            }
        </div>
    )
}

export default ProductHighlight;
