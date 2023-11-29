import { useState, useEffect, useCallback  } from "react";
import { useParams, useNavigate} from "react-router-dom";
import ShowStars from "../components/ShowStars/ShowStars";
import ReviewTaker from "../components/ReviewTaker/ReviewTaker";
import postReview from "../components/ReviewTaker/postReview";

function ProductDetail({ quantumAuth }){

    const [product, setProduct] = useState()
    const [rating, setRating] = useState(0)
    const [buyerNames, setBuyerNames] = useState([])
    const [isReviewTakerVisible, setReviewTakerVisibility] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const toggleReviewTaker = () => {
      setReviewTakerVisibility(!isReviewTakerVisible);
  };

  function formatCreatedAt(createdAtString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const createdAtDate = new Date(createdAtString);
    return createdAtDate.toLocaleString('en-US', options);
  }

    const loadProducts = useCallback(async () => {
       
      const productUrl = quantumAuth.baseUrl + `/api/products/${id}`;
      try {
      
        const response = await fetch(productUrl);
        const data = await response.json()
        if (data[0] && data.length > 0){
          console.log('data:', data)
          setProduct(data[0])
          setRating(Math.round(data[0].rating_sum/data[0].rating_count));
          //TODO: get rating functional Math.round(product.rating_sum / product.rating_count) )
        } else {
            throw new Error("No products found")
        }
      } catch (e) {
        setProduct([])
        setRating(0)
    }
  },[quantumAuth, id])

  // Asynchronously fetches the buyer's full name based on the provided buyer_id
const loadBuyerFullName = useCallback(async (buyer_id) => {
  // Construct the URL for fetching buyer information
  const buyerUrl = quantumAuth.baseUrl + `/api/reviews/buyer/${buyer_id}`;
  
  // Configuration for the HTTP request
  const fetchConfig = {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(buyerUrl, fetchConfig);

  // Check if the response is successful (status code 2xx)
  if (response.ok) {
    // Parse the JSON data from the response
    const data = await response.json();
    // Return buyer's fullname from the reviews
    return data.reviews[0].buyer_fullname;
  } else {
    // Return an empty string if there's an error in the response
    return "";
  }
},[quantumAuth.baseUrl]);

// loads the full names of all buyers associated with product reviews
const loadBuyersFullNames = async () => {
  // if there is product
  if (product) {
    // Extract buyer_ids from the product reviews
    const buyerIds = product.reviews.map((review) => review.buyer_id);
    console.log(buyerIds)
    
    // Fetch the full names of all buyers concurrently using Promise.all
    const names = await Promise.all(buyerIds.map((buyerId) => loadBuyerFullName(buyerId)));

    // Update the 'buyerNames' state with the fetched full names
    setBuyerNames(names);
  }
};

const handleSubmitReview = async (review) => {
        postReview(review, id, quantumAuth)
            .then((res) => {
                
                console.log("Posting result:", res);
            })
            .catch((err) => {
                console.log("Posting error:", err);
            })
            navigate('/products')
    }

//  load product information when the component mounts
useEffect(() => {
  loadProducts();
}, [loadProducts]);

//  hook to load full names of buyers when the 'product' state changes
useEffect(() => {
  loadBuyersFullNames();
//eslint-disable-next-line  
}, [product]);



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="container mt-5">
      <div className="card">
        <div className="card-body hero-interaction ">
          <h2 className="card-title">{product.name}</h2>
          <img src={product.image} alt=""  className="img-fluid w-40 d-block mx-auto"/>
          <p className="card-text">{product.description}</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Price:</strong> ${product.price}
            </li>
            <li className="list-group-item">
              <strong>Unit:</strong> {product.unit}
            </li>
            <li className="list-group-item">
              <strong>Sold By:</strong> {product.vendor_fullname}
            </li>
            <li className="list-group-item">
              <strong>Rating:</strong>  <ShowStars rating = {rating}/>
            </li>
            {/* Add more details as needed */}
          </ul>
          <button className="btn btn-info btn-md" onClick={toggleReviewTaker }>Leave Review</button>
        </div>
        
      </div>
      
    </div>
 
      {isReviewTakerVisible && <ReviewTaker  onSubmit={handleSubmitReview} />}
    <div className="text-center">
    <h3 className="mt-4">Comments:</h3>
    {product.reviews.map((review, i) => (
    <div className="chat chat-start border p-4 mb-4 mt-4 hero-interaction col-6 mx-auto" key={i}>
      <div className="chat-header d-flex justify-content-between">
        <div className="chat-bubble mt-2"><span className="text-xs opacity-50">Comment: </span> {review.comment}</div>
        
         <time className="text-xs opacity-50">{formatCreatedAt(review.createdAt)}</time>
      </div>
      
      <div className="fw-bold"> <span className="text-xs opacity-50">Reviewed by: </span>{buyerNames[i]}</div>
      <div className="chat-footer opacity-50 mt-2"></div>
    </div>
  )
    )}
    </div>
    </>
  );
};




export default ProductDetail;
