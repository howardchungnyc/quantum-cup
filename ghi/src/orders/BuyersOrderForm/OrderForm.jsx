import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderForm({ quantumAuth, productData }) {
  const [buyer, setBuyer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!quantumAuth.isAuthenticated()) {
      navigate("/signup");
    }
  }, [quantumAuth, navigate]);

  // load buyer's fullname when DOM mounts
  const loadBuyerFullName = async () => {
    try {
      const buyerFullName = quantumAuth.getAuthentication().account.fullname;
      setBuyer(buyerFullName);
    } catch (error) {
      console.log("Error loading user detail: ", error);
    }
  };

  useEffect(() => {
    loadBuyerFullName();
    // eslint-disable-next-line
  }, []);

  // handle quantity change
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(value);

    const newTotal = parseFloat(productData.product.price) * parseFloat(value);
    setTotal(isNaN(newTotal) ? 0 : newTotal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const buyerId = quantumAuth.getAuthentication().account.id;
    const buyerName = quantumAuth.getAuthentication().account.fullname;
    const productId = productData.product.id;
    const vendorId = productData.product.vendor_id;
    const vendorName = productData.product.vendor_fullname || productData.product.vendor_name
    const data = {
      product_id: productId,
      buyer_id: buyerId,
      buyer_fullname: buyerName,
      vendor_fullname: vendorName,
      vendor_id: vendorId,
      product_name: productData.product.name,
      price: parseFloat(productData.product.price),
      unit: productData.product.unit,
      quantity: parseInt(quantity),
      total: parseFloat(total),
    };

    const orderUrl = `${quantumAuth.baseUrl}/api/orders/create`;

    try {
      const response = await fetch(orderUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setQuantity('');
        setTotal('');
      } else {
        console.error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row mx-2 my-5">
        <div className="offset-1 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="px-2"><b>Order Form</b></h1>

            <form onSubmit={handleSubmit}>
              <div>Welcome <strong>{buyer}</strong>, place your order here!</div>
              <br />

              <table className="table">
                <tbody>
                  <tr>
                    <td className="bg-white fw-bold text-end">Product: </td>
                    <td className="bg-white">{productData.product.name}</td>
                  </tr>
                  <tr>
                    <td className="bg-white fw-bold text-end">Price: </td>
                    <td className="bg-white">${productData.product.price}</td>
                  </tr>
                  <tr>
                    <td className="bg-white fw-bold text-end">Unit: </td>
                    <td className="bg-white">{productData.product.unit}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="bg-white fw-bold text-end">Quantity: </td>
                    <td>
                      <input
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="Enter quantity"
                        required
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-white fw-bold text-end">Total: </td>
                    <td className="bg-white">${Number(total).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="text-end">
                <button className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Submit</button>
              </div>

            </form>
          </div>
        </div>

        <div className="offset-1 col-3 float">
          <div className="shadow p-4 mt-4">
            <div><strong>Sold by:</strong> {productData.product.vendor_fullname || productData.product.vendor_name}</div>
            <img src={productData.product.image} alt="Product" className="img-fluid" />
          </div>
        </div>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Success, your order has been submitted</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body"></div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate("/buyer/orders")}>View Order Status</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
