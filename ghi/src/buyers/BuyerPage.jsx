import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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

    // If not a buyer, don't show anything
    if (role !== 'buyer') return null;
    
    return (
        <div>
            <h1 className="text-center">Buyer Page</h1>
        </div>
    );
}

export default BuyerPage;
