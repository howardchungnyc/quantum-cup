import React, { useCallback, useState, useEffect } from "react";
import "./VendorPage.css";
import { Link } from "react-router-dom";

function OrderManagement({ quantumAuth }) {
    const [orderList, setOrderList] = useState([]);
    const [ordersByVendor, setOrdersByVendor] = useState([]);

    const loadOrders = useCallback(async () => {
        try {
            const res = await fetch(quantumAuth.baseUrl + "/api/orders");

            if (res.ok) {
                const data = await res.json();
                setOrderList(data.orders);
            } else {
                console.error('Failed to fetch orders:', res.status);
                setOrderList([]);
            }
        } catch (error) {
            console.error('Error during orders fetch:', error);
            setOrderList([]);
        }
    }, [quantumAuth.baseUrl]);

    useEffect(() => {
        loadOrders();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // Filter orders by vendor when auth changes
        if (quantumAuth.getAuthentication() && quantumAuth.getAuthentication().account) {
            const ordersForVendor = orderList.filter(order => order.vendor_id === quantumAuth.getAuthentication().account.id);
            setOrdersByVendor(ordersForVendor);
        } // eslint-disable-next-line
    }, [quantumAuth.getAuthentication(), orderList]);

    return (
        <div className="d-flex flex-column flex-md-row justify-content-around my-5">
            {/* left panel */}
            <div className="d-flex flex-column col-6 align-items-center">
                <h1 className="panel-title">Orders</h1>
                <div id="open-orders-id">
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Orders</th>
                                    <th scope="col">Buyer</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersByVendor.map((order, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{order.buyer_fullname}</td>
                                        <td>{order.product_name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.unit}</td>
                                        <td>${order.price}</td>
                                        <td>${order.total}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Link
                                                role="button"
                                                id="order-mgmt-btn"
                                                className="btn btn-sm text-center"
                                            // to={}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                role="button"
                                                id="order-mgmt-btn"
                                                className="btn btn-sm text-center"
                                            // to={}
                                            >
                                                Cancel
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* right panel */}
            <div className="d-flex flex-column align-items-center col-6 container">
                <div className="col-12 col-md-6 logo-signup">
                    <img src="https://i.imgur.com/zlzNSFj.png" alt="coffee log" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default OrderManagement;
