import React from "react";
import "./VendorPage.css";

function VendorPage() {
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
