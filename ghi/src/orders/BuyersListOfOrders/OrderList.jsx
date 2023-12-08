import { React, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";


function OrderList({ quantumAuth }) {


    const [orderList, setOrderList] = useState([])
    const [ordersByBuyer, setOrdersByBuyer] = useState([])

    const loadOrders = useCallback(async () => {
        try {
            const res = await fetch(quantumAuth.baseUrl + "/api/orders");

            if (res.ok) {
                const data = await res.json();
                setOrderList(data.orders);

            } else {
                console.error('Failed to fetch products:', res.status);
                setOrderList([]);
            }
        } catch (error) {
            console.error('Error during orders fetch:', error);
            setOrderList([]);
        }
    }, [quantumAuth.baseUrl]);

    useEffect(() => {
        loadOrders()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        // Filter orders by buyer when auth changes
        const authentication = quantumAuth.getAuthentication();
        if (authentication && authentication.account) {
            const ordersForBuyer = orderList.filter(order => order.buyer_id === authentication.account.id);
            setOrdersByBuyer(ordersForBuyer);
        }
    }, [quantumAuth, orderList]);

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
                                {ordersByBuyer.map((order, i) => (
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
                                            // to={product.id}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                role="button"
                                                id="order-mgmt-btn"
                                                className="btn btn-sm text-center"
                                            // to={product.id}
                                            >
                                                Delete
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

export default OrderList;
