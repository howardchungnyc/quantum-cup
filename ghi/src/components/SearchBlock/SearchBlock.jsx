import React from "react";
import { quantumSearch } from "./quantumSearch"
import { Link } from 'react-router-dom';
import "./SearchBlock.css";


function ResultList({ searchResults }) {
    return (
        searchResults ?
            searchResults.length ?
                <div className="list-group">
                    {searchResults.map((result, ix) => (
                        <Link key={ix} to={`/products/${result.product_id}`}
                            className="list-group-item list-group-item-action">
                            <strong>{result.product}</strong> <small>by {result.vendor_name}</small>
                        </Link>
                    ))}
                </div>
                : <div className="list-group-item">No results</div>
            : <div></div>
    );
}

/**
 * SearchBlock component
 *
 * This component is a search block with a search input and submit button.
 *
 * If the caller provides an onSubmit handler, it will be called when the
 * user submits the search form. Otherwise, the default action is to do
 * a fuzzy search.
 *
 * If a fuzzy search is done, the caller can optionally provide a
 * fieldsSelector, a string containing a comma-separated list of fields to
 * search. If no fieldsSelector is provided, the default is to search all
 * fields.
 * Valid fields are:
 *  - "name"
 *  - "description"
 *  - "vendor"
 *
 * Example of fieldsSelector:
 *  - "name,description"
 *  - "vendor"
 *
 * @param {Object} props - Component properties
 * @param {string} props.placeholder - Placeholder text for search input
 * @param {function} props.onSubmit - Handler for search submit
 * @param {string} props.fieldsSelector - Selector for fields to search
 * @param {Object} props.quantumAuth - Authentication object
 * @returns {JSX.Element} Search block component
 */
function SearchBlock({ placeholder, onSubmit, fieldsSelector, quantumAuth }) {
    const [searchResults, setSearchResults] = React.useState(null);
    /**
     * Handle search submit
     * If the caller has provided an onSubmit handler, call it and stop,
     * otherwise do the default action, which is to do our fuzzy search.
     *
     * @param {Event} e - The event object
     */
    async function handleSubmit(e) {
        if (onSubmit) return onSubmit(e);
        e.preventDefault();
        const res = await quantumSearch(e.target[0].value, fieldsSelector, quantumAuth);
        setSearchResults(res.matches);
    }
    return (
        <form onSubmit={handleSubmit} onChange={() => setSearchResults(null)}
            className="d-flex col-md-4 mx-3" role="search">
            <div className="me-2" style={{ width: "15rem" }}>
                <input className="form-control" type="search"
                    placeholder={placeholder} aria-label="Search" />
                <div id="search-results">
                    <ResultList searchResults={searchResults} />
                </div>
            </div>
            <div>
                <button className="btn" type="submit">
                    Search
                </button>
            </div>
        </form>
    )
}


export default SearchBlock;
