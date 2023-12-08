import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./VendorDetailPage.css";


function VendorList({ quantumAuth, setAlert }) {
    const [vendorList, setVendorList] = useState(null);
    

    async function getVendorList() {
        const url = quantumAuth.baseUrl + `/api/vendors/`;
        const res = await fetch(url, { method: "get", credentials: "include" });
        if (res.ok) {
            const data = await res.json();
            if (data === null) return setAlert("Vendors not found", false);
            setVendorList(data);
        } else {
            setAlert("Unable to get vendor List", false);
        }
    }

    useEffect(() => {
        getVendorList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // an empty array means this effect will only run once

    // On the first render, vendorList is null
    if (!vendorList) {
        return <p>Loading...</p>
    }
   return (
  <div className="container my-3">
    <div className="row">
      {vendorList["vendors"].map((vendor, i) => (
        <div key={i} className="col-md-6 mb-3 ">
          <div className="card hero-interaction">
            <div className="card-body">
              <div className="d-flex">
                <Link 
                 to={`/vendor/${vendor.id}`} className="vendor_link">
                <div id="vendor-initial-two">{`${vendor.fullname[0].toUpperCase()}`}</div>
                </Link>
                <div>
                 <Link 
                 to={`/vendor/${vendor.id}`} className="vendor_link">
                    <h1 className="mb-3">{vendor.fullname}</h1>
                </Link>
                </div>
              </div>
              <div>
                <h3>{`${vendor.fullname} - Contact Information`}</h3>
                <div>
                  <div>
                    <strong>Email: </strong>
                    {vendor.email}
                  </div>
                  <div>
                    <strong>Address: </strong>
                  </div>
                  <div className="ms-3">
                    <div>{vendor.street}</div>
                    <div>{`${vendor.city}, ${vendor.state} ${vendor.zipcode}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
    }
export default VendorList;
