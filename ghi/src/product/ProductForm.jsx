import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm({ quantumAuth, productData }) {
  // State variables to manage form input values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");

  // Access the navigation function from React Router
  const navigate = useNavigate();

  // Event handler functions to update state on input changes
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleImageChange = (event) => {
    const value = event.target.value;
    setImage(value);
  };

  const handleUnitChange = (event) => {
    const value = event.target.value;
    setUnit(value);
  };
  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };
useEffect(() => {
    const fetchProductForEdit = async () => {
      if (productData) {
         setName(productData.name);
                setDescription(productData.description);
                setImage(productData.image);
                setUnit(productData.unit);
                setPrice(productData.price.toString());
      }
    };

    fetchProductForEdit();
  }, [productData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      description: description,
      image: image,
      unit: unit,
      price: parseFloat(price),
    };

    let productUrl = `${quantumAuth.baseUrl}/api/products`;
    let method = "POST";

    if (productData) {
      productUrl += `/${productData.id}`;
      method = "PUT";
    }

    const fetchConfig = {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(productUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      navigate("/vendor/product");
    }
  };

  return (
    <div className="row services ">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 mb-4">
          <h1 className="px-2">{productData ? "Edit" : "Create"} a Product</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="YYYY-MM-DD"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={description}
                onChange={handleDescriptionChange}
                placeholder="description"
                required
                type="text"
                name="description"
                id="description"
                className="form-control"
              />
              <label htmlFor="description">Description</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={image}
                onChange={handleImageChange}
                placeholder="image"
                required
                type="text"
                name="image"
                id="image"
                className="form-control"
              />
              <label htmlFor="image">Image</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={unit}
                onChange={handleUnitChange}
                placeholder="unit"
                required
                type="text"
                name="unit"
                id="unit"
                className="form-control"
              />
              <label htmlFor="unit">Unit</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={price}
                onChange={handlePriceChange}
                placeholder="price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;