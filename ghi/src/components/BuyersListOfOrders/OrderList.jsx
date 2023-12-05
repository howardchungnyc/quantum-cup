import { React, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function OrderList({quantumAuth, auth}) {
    

    const [productList, setProductList] = useState([])
    const [productsByVendor, setProductsByVendor] = useState([])

    const loadProducts = useCallback(async () => {
        try {
            const res = await fetch(quantumAuth.baseUrl + "/api/products");

            if (res.ok) {
                const data = await res.json();
                console.log('data:', data);
                setProductList(data.products);

            } else {
                console.error('Failed to fetch products:', res.status);
                setProductList([]);
            }
        } catch (error) {
            console.error('Error during product fetch:', error);
            setProductList([]);
        }
    },[quantumAuth.baseUrl]);

useEffect(()=>{
    loadProducts()
},[])

useEffect(() => {
        // Filter products by vendor when auth changes
        if (auth && auth.account) {
            const productsForVendor = productList.filter(product => product.vendor_id === auth.account.id);
            setProductsByVendor(productsForVendor);
        }
    }, [auth, productList]);






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
                                <th scope="col">Name</th>
                                <th scope="col">Desciption</th>
                                <th scope="col">Units</th>
                                <th scope="col">Price</th>
                                <th scope="col">Rating</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {productsByVendor.map((product, i) => (
                            <tr key= {i}>
                                <th scope="row">{i+1}</th>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.unit}</td>
                                <td>{product.price}</td>
                                <td>{product.rating_count ? Math.round(product.rating_sum / product.rating_count) : 0}</td>
                                <td>
                                    <Link 
                                        role="button" 
                                        id="product-mgmt-btn"
                                        className="btn btn-sm text-center" 
                                        to={product.id}
                                        >
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <Link 
                                        role="button" 
                                        id="product-mgmt-btn"
                                        className="btn btn-sm text-center" 
                                        to={product.id}
                                        >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                            )
    )}
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
                        className="btn huge-btn text-center" to="/createproduct">
                        Add Product
                    </Link>
                </div>
                
            </div>
        </div>
    );
}



export default OrderList;

