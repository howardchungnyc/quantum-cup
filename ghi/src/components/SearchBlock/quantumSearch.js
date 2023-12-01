
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
        return { matches: []};
    }
    return await response.json();
}
