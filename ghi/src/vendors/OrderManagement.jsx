import { React, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./VendorPage.css";

function OrderManagement({quantumAuth, auth}) {
    

//     const [orderList, setOrderList] = useState([])
//     const [ordersByVendor, setOrdersByVendor] = useState([])

//     const loadOrders = useCallback(async () => {
//         try {
//             const res = await fetch(quantumAuth.baseUrl + "/api/orders");

//             if (res.ok) {
//                 const data = await res.json();
//                 console.log('data:', data);
//                 setOrderList(data.orders);

//             } else {
//                 console.error('Failed to fetch orders:', res.status);
//                 setOrderList([]);
//             }
//         } catch (error) {
//             console.error('Error during orders fetch:', error);
//             setOrderList([]);
//         }
//     },[quantumAuth.baseUrl]);

// useEffect(()=>{
//     loadOrders()
// },[])

// useEffect(() => {
//         // Filter orders by vendor when auth changes
//         if (auth && auth.account) {
//             const ordersForVendor = orderList.filter(order => order.vendor_id === auth.account.id);
//             setOrdersByVendor(ordersForVendor);
//         }
//     }, [auth, orderList]);






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
                                <th scope="col "># ID</th>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                                <th scope="col">Buyer</th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* {ordersByVendor.map((order, i) => (
                            <tr key= {i}>
                                <th scope="row">{i+1}</th>
                                <td>{order.name}</td>
                                <td>{order.description}</td>
                                <td>{order.unit}</td>
                                <td>{order.price}</td>
                                <td>{order.rating_count ? Math.round(order.rating_sum / order.rating_count) : 0}</td>
                            </tr>
                            )
    )} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* right panel */}
            <div className="d-flex flex-column align-items-center col-6 container">
                <div className="col-12 col-md-6 logo-signup">
                    <img src="/img/logo_light_bg.png" alt="coffee log" className="img-fluid" />
                </div>
                <div>
                    <Link role="button" id="product-mgmt-btn"
                        className="btn huge-btn text-center" to="#">
                        ???
                    </Link>
                </div>
                
            </div>
        </div>
    );
}



export default OrderManagement;
