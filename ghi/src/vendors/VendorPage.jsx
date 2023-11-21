import React, { useEffect } from "react";
import "./VendorPage.css";
import { useNavigate } from 'react-router-dom';


function VendorPage({ setAlert, quantumAuth }) {
    const navigate = useNavigate();
    const role = quantumAuth.getAuthentication() &&
        quantumAuth.getAuthentication().account.role;

    // Navigate to the home page if not logged in or not a vendor
    useEffect(() => {
        async function checkLogin() {
            if (!quantumAuth.isAuthenticated() ||
                quantumAuth.getAuthentication().account.role !== 'vendor') {
                navigate('/');
            }
        }
        checkLogin();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
        , []);

    // If not a vendor, don't show anything
    if (role !== 'vendor') return null;

    return (
        <div className="d-flex flex-column flex-md-row justify-content-around my-5">
            {/* left panel */}
            <div className="d-flex flex-column col-6 align-items-center">
                <h1 className="panel-title">Open Orders</h1>
                <div id="open-orders-id">
                    <h2>Open Orders</h2>
                </div>
            </div>
            {/* right panel */}
            <div className="d-flex flex-column align-items-center col-6 container">
                <div>
                    <a role="button" id="product-mgmt-btn"
                        className="btn mgmt-btn" href="/productmgmt">
                        Product Management
                    </a>
                </div>
                <div>
                    <a role="button" id="product-mgmt-btn"
                        className="btn mgmt-btn" href="/ordermgmt">
                        Order Management
                    </a>
                </div>
            </div>
        </div>
    );
}


export default VendorPage;
