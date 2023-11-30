import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './BuyerPage.css';
import SearchBlock from '../components/SearchBlock/SearchBlock';
import ProductHighlight from '../components/ProductHighlight/ProductHighlight';

function BuyerPage({ setAlert, quantumAuth }) {
    const navigate = useNavigate();
    const role = quantumAuth.getAuthentication() &&
        quantumAuth.getAuthentication().account.role;

    // Navigate to the home page if not logged in or not a buyer
    useEffect(() => {
        async function checkLogin() {
            if (!quantumAuth.isAuthenticated() ||
                role !== 'buyer') {
                navigate('/');
            }
        }
        checkLogin();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    // Handle orders click
    const handleOrdersClick = async () => {
        // TODO: Implement orders page
        navigate('/orders/buyer');
    }

    // Handle reviews click
    const handleReviewsClick = async () => {
        // TODO: Implement reviews page
        navigate('/reviews/buyer');
    }

    // If not a buyer, don't show anything
    if (role !== 'buyer') return null;
    return (
        <div>
            {/* Search top panel */}
            <div className="d-flex justify-content-end my-3">
                <SearchBlock placeholder="Search for products" quantumAuth={quantumAuth} />
            </div>

            {/* Content bottom panel */}
            <div className="d-flex flex-column flex-md-row mx-2 my-5">
                {/* Left panel - Prod highlight */}
                <div className="col-md-8 buyer-left-panel mx-0 mx-md-1 my-2 my-md-0">
                    <h2 className="text-center mt-3">Product Highlight</h2>
                    <ProductHighlight quantumAuth={quantumAuth} />
                </div>

                {/* Right panel - buttons */}
                <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center buyer-right-panel mx-0 mx-md-1 my-2 my-md-0">
                        <div onClick={handleOrdersClick} className="open-btn" role="button">ORDERS</div>
                        <div onClick={handleReviewsClick} className="open-btn" role="button">REVIEWS</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerPage;
