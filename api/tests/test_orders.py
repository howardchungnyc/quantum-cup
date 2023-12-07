from fastapi.testclient import TestClient
from main import app
from queries.orders import OrderQueries
from routers.authenticator import authenticator
from models.orders import OrderIn, OrderOut

client = TestClient(app)

mock_response = {
    "product_id": "65682374683a044082956a2a",
    "status": "pending",
    "buyer_id": "65651058f9b48f0981eea9e7",
    "buyer_fullname": "Buyer One",
    "vendor_id": "65651099f9b48f0981eea9e8",
    "vendor_fullname": "Vendor One",
    "product_name": "Dark Roasted Coffee Beans",
    "price": 19.99,
    "unit": "oz",
    "quantity": 3,
    "total": 59.97,
    "createdAt": "2023-12-05, 02:22",
}

#
# Mocking the classes
#


class MockOrderQueries:
    def create_order(self, order: OrderIn, account: dict) -> OrderOut:
        return OrderOut(**mock_response)


def fake_get_current_account_data():
    return {}


#
# Unit tests
#


#
# Sanity check
#
def test_sanity():
    assert 1 == 1


#  Test the create orders API
def test_order():
    # Arrange
    app.dependency_overrides[OrderQueries] = MockOrderQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    response = client.post(
        "/api/orders/create",
        json={
            "product_id": "65682374683a044082956a2a",
            "buyer_id": "65651058f9b48f0981eea9e7",
            "buyer_fullname": "Buyer One",
            "vendor_id": "65651099f9b48f0981eea9e8",
            "vendor_fullname": "Vendor One",
            "product_name": "Dark Roasted Coffee Beans",
            "price": 19.99,
            "unit": "oz",
            "quantity": 3,
            "total": 59.97,
        },
    )

    # Assert
    assert response.status_code == 200
    assert response.json() == mock_response

    # Clean up
    app.dependency_overrides = {}
