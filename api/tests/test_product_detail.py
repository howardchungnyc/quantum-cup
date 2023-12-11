from fastapi.testclient import TestClient
from main import app
from queries.products import ProductQueries
from models.products import ProductDetail

client = TestClient(app)  # This is used to send the request to the app

mock_response = {
    "id": "656fa0ca3d74c796c2b1b45a",
    "name": "Organic Single Origin Arabica",
    "description": "Flavor: Sweet and layered with notes of"
    + "maple and herbs Body and acidity:"
    + "Medium body and acidity Beans: 100% arabica",
    "image": "https://stories.starbucks.com/uploads"
    + "/2022/10/Starbucks_Holiday_Blend_2022.jpg",
    "unit": "12 oz.",
    "price": 15.0,
    "rating_count": 3,
    "rating_sum": 10,
    "vendor_id": "6567bafb104d0a1df03bee77",
    "vendor_fullname": "Cheech and Sons",
    "reviews": [
        {
            "id": "65727daeb6c61e708f2569b0",
            "buyer_id": "6564d3cedc73e42ec7f4038c",
            "comment": "I think it is delicious!",
            "createdAt": "2023-12-08T02:21",
        },
        {
            "id": "65727af6b8ea6759c8bff083",
            "buyer_id": "6564d3cedc73e42ec7f4038b",
            "comment": "It's awful!\n",
            "createdAt": "2023-12-08T02:09",
        },
    ],
}


class MockProductQueries:
    @staticmethod
    def get_one_product(product_id: str) -> ProductDetail:
        # we're simulating the behavior of the real Product Queries class
        #  and returning a Product Detail Instance based on the mock response.
        return ProductDetail(**mock_response)


# Your test_sanity function remains unchanged


# Test the product_detail endpoint
def test_product_detail():
    # Arrange
    app.dependency_overrides[
        ProductQueries
    ] = MockProductQueries  # replace the real query with the mock.

    # Act
    response = client.get("/api/products/656fa0ca3d74c796c2b1b45a")

    # Assert
    assert response.status_code == 200
    assert response.json() == mock_response  # if these are true pass test
    # Clean up
    app.dependency_overrides = (
        {}
    )  # get rid of the override to avoid affecting anything else.
