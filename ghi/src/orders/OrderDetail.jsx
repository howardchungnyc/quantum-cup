import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

function OrderDetail({ quantumAuth, handleClick }) {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    const loadOrderDetail = useCallback(async () => {
        const orderUrl = quantumAuth.baseUrl + `/buyer/orders/${id}`;
        try {
            const response = await fetch(orderUrl);
            const data = await response.json();
            console.log("data: ", data)
            if (data) {
                setOrder(data)
            } else {
                throw new Error("No orders found")
            }
        } catch (error) {
            console.error("Error fetching order:", error)
            setOrder(null)
        }
    }, [quantumAuth.baseUrl, id])

    useEffect(() => {
        loadOrderDetail();
    }, [loadOrderDetail])

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Order Detail</h1>
            <p>Order ID: {order.id}</p>
            <p>Buyer: {order.buyer_fullname}</p>
            {/* Add more order details as needed */}
            <Link to="/buyer/orders">Back to Orders</Link>
        </div>
    );
};


export default OrderDetail;
