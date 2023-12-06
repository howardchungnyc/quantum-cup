from fastapi.testclient import TestClient
from main import app
from queries.search import SearchQueries
from routers.authenticator import authenticator
from models.search import (
    SearchMatchList,
    SearchMatchIn,
    SearchItem,
    SearchItemIn,
)

client = TestClient(app)

mock_response = {
    "product_id": "6567ec22086d65b23f587a31",
    "product": "Test Product",
    "description": "Description of Test Product",
    "vendor_id": "6567ec22086d65b23f587777",
    "vendor_name": "Test Vendor",
}

#
# Mocking the classes
#


class MockSearchQueries:
    def search(self, query: str | None, sel: str | None) -> SearchMatchList:
        fake_match = SearchMatchIn(**mock_response)
        return SearchMatchList(matches=[fake_match])

    def update_index(self, data: SearchItemIn, account) -> SearchItem:
        return SearchItem(**mock_response)


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


#
# Test the search API
#
def test_search():
    # Arrange
    app.dependency_overrides[SearchQueries] = MockSearchQueries

    # Act
    response = client.get("/api/search?q=test&sel=description")

    # Assert
    assert response.status_code == 200
    assert response.json() == {"matches": [mock_response]}

    # Clean up
    app.dependency_overrides = {}


#
# Test the update index API
#
def test_update_index():
    # Arrange
    app.dependency_overrides[SearchQueries] = MockSearchQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    # Act
    response = client.post(
        "/api/search",
        json={
            "product_id": "6567ec22086d65b23f587a31",
            "product": "Test Product",
            "description": "Description of Test Product",
            "vendor_id": "6567ec22086d65b23f587777",
            "vendor_name": "Test Vendor",
        },
    )

    # Assert
    assert response.status_code == 200
    assert response.json() == mock_response

    # Clean up
    app.dependency_overrides = {}
