import React, { useEffect } from "react";
import './ProductHighlight.css';
import ShowStars from "../ShowStars/ShowStars";

const DEFAULT_VENDOR = "Quantum Inc.";
const DEFAULT_PRODUCT = "Quantum Cup App";
const DEFAULT_IMAGE = "img/logo_light_bg.png";
const DEFAULT_DESCRIPTION = "Buy the best coffee in the world and connect with vendors through the Quantum Cup app. Rate and review to build our coffee community.";
const DEFAULT_RATING = 4;


function ProductHighlight({ quantumAuth }) {
    const [prodID, setProdID] = React.useState(0);
    const [product, setProduct] = React.useState(DEFAULT_PRODUCT);
    const [image, setImage] = React.useState(DEFAULT_IMAGE);
    const [description, setDescription] = React.useState(DEFAULT_DESCRIPTION);
    const [vendor, setVendor] = React.useState(DEFAULT_VENDOR);
    const [rating, setRating] = React.useState(DEFAULT_RATING);

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
                    const randomIndex = Math.floor(Math.random() * data.products.length);
                    const product = data.products[randomIndex];
                    setProduct(product.name);
                    setImage(product.image);
                    setDescription(product.description);
                    setVendor(product.vendor_id);
                    setRating(product.rating);
                    setProdID(product.id);
                } else {
                    throw new Error("No products found");
                }
            } catch (e) {
                setProduct(DEFAULT_PRODUCT);
                setImage(DEFAULT_IMAGE);
                setDescription(DEFAULT_DESCRIPTION);
                setVendor(DEFAULT_VENDOR);
                setRating(DEFAULT_RATING);
            }
        }
        getAHighlighProduct();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    const handleOnclick = (e) => {
        e.preventDefault();
        // TODO: redirect to the product purchase page
    }

    return (
        <div className="d-flex flex-column">
            <div className="image-container">
                <img id="highlight-img" src={image} alt="Product" />
                <div className="text-container">
                    <h4>{product}</h4>
                    <p className="mb-4">by {vendor}</p>
                    <p>{description}</p>
                </div>
            </div>
            {/* Use stars to rate: */}
            <div className="m-3 d-flex flex-column align-items-end">
                <div className="my-2">
                    Rated:
                    <ShowStars rating={rating} />
                </div>
                <div className="mx-2">
                    <button onClick={handleOnclick} className="btn btn-lg">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default ProductHighlight;
