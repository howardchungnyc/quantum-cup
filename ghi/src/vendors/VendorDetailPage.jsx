import React from "react";
import { useParams } from "react-router-dom";
import "./VendorDetailPage.css";


function VendorDetailPage({ quantumAuth, setAlert }) {
    const { id } = useParams();
    const [vendorInfo, setVendorInfo] = React.useState(null);
    const [vendorProducts, setVendorProducts] = React.useState();

    async function getVendorInfo() {
        const url = quantumAuth.baseUrl + `/api/vendors/${id}`;
        const res = await fetch(url, { method: "get", credentials: "include" });
        if (res.ok) {
            const data = await res.json();
            setVendorInfo(data);
            console.log(data);
        } else {
            setAlert("Unable to get vendor information", false);
        }
    }

    async function getVendorProducts() {
        const url = quantumAuth.baseUrl + `/api/products`;
        const res = await fetch(url, { method: "get", credentials: "include" });
        if (res.ok) {
            const data = await res.json();
            const vp = data.products.filter(
                product => product.vendor_id === id);
            setVendorProducts(vp);
        } else {
            setAlert("Unable to get vendor products", false);
        }

    }

    React.useEffect(() => {
        getVendorInfo();
        getVendorProducts();
    }, []);

    // On the first render, vendorInfo is null
    if (!vendorInfo) {
        return <p>Loading...</p>
    }
    return (
        <div className="container my-3">
            {/* Top half */}
            <div className="d-flex mb-3" >
                <div id="vendor-initial">{`${vendorInfo.fullname[0]}`}</div>
                <div>
                    <h1 className="mb-3">{vendorInfo.fullname}</h1>
                    <h3>Line of Products</h3>
                    <div className="ms-3">
                        {vendorProducts && vendorProducts.length > 0 ?
                            vendorProducts.map(product =>
                                <a key={product.id} className="prod-link" href={`/products/${product.id}`}>
                                    <div>{product.name}</div>
                                </a>
                            ) :
                            <p>No products found</p>
                        }
                    </div>
                </div>
            </div>

            {/* Bottom half */}
            <div>
                <h3>{`${vendorInfo.fullname} - Contact Information`}</h3>
                <div>
                    <div><strong>Email: </strong>{vendorInfo.email}</div>
                    <div><strong>Address: </strong></div>
                    <div className="ms-3">
                        <div>{vendorInfo.street}</div>
                        <div>{`${vendorInfo.city}, ${vendorInfo.state} ${vendorInfo.zipcode}`}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorDetailPage;
