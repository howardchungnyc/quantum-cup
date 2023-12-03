
/**
 * Performs a search on the given search term and search fields.
 *
 * @param {String} searchTerm
 * @param {String} searchFields
 * @param {Object} quantumAuth - Authentication object
 */
export async function quantumSearch(searchTerm, searchFields, quantumAuth) {
    const st = encodeURIComponent(searchTerm);
    let url = `${quantumAuth.baseUrl}/api/search?q=${st}`
    if (searchFields) {
        const sf = encodeURIComponent(searchFields);
        url += `&sel=${encodeURIComponent(sf)}`;
    }
    const response = await fetch(url, { method: "get", credentials: "include" });
    if (!response.ok) {
        return { matches: [] };
    }
    return await response.json();
}


/**
 * Adds a product to the search index.
 *
 * The following fields will be sent to the search index as a POST request:
 *      product_id: str
 *      product: str
 *      description: str
 *      vendor_id: str
 *      vendor_name: str
 *
 * @param {Object} productData - Product data object
 * @param {Object} quantumAuth - Authentication object
 */
export async function add_to_search_index(productData, quantumAuth) {
    if (!productData) return;
    const data = {
        product_id: productData.id,
        product: productData.name,
        description: productData.description,
        vendor_id: productData.vendor_id,
        vendor_name: quantumAuth.getAuthentication().account.fullname,
    };
    const response = await fetch(`${quantumAuth.baseUrl}/api/search`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.log("add_to_search_index: ", response);
    }
    return null;
}
