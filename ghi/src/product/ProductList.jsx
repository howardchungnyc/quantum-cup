import ShowStars from "../components/ShowStars/ShowStars";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

function ProductList({ quantumAuth }) {
  const [productList, setProductList] = useState([]);

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
  }, [quantumAuth.baseUrl]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="services">

      <div className="container">
        <h1 className="mb-5 mt-3 dark-text">Products</h1>
        <div className="row">
          {productList.map((product, i) => (
            <div className="col-lg-4 col-md-6 mb-4" key={i}>
              <div className="card hero-interaction h-100 d-flex flex-column">
                <div className="card-body text-center card-r">
                  <h5 className="card-title">{product.name}</h5>
                  <img src={product.image} alt="" className="img-fluid w-40 d-block mx-auto" />
                  <ul className="list-group list-group-flush  ">
                    <li className="list-group-item hero-interaction"><p className="card-text">{product.description}</p></li>
                    <li className="list-group-item hero-interaction"> <p className="card-text"> <span className="fw-bold">Sold By</span> :  {product.vendor_name}</p></li>
                    <li className="list-group-item hero-interaction">
                      <p className="card-text">
                        <span className="fw-bold">Price</span> : ${product.price}
                      </p>
                    </li>
                    <li className="list-group-item hero-interaction">
                      <p className="card-text">
                        <span className="fw-bold">Unit</span> : {product.unit}
                      </p>
                    </li>
                    <li className="list-group-item hero-interaction">
                      <p className="card-text">
                        <span className="fw-bold">Rating</span> :<ShowStars rating={Math.round(product.rating_sum / product.rating_count)} />
                      </p>
                    </li>
                    <Link to={`/products/${product.id}`} className="btn btn-md ">
                      Product Detail
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductList;
