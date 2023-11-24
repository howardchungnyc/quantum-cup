import React from "react";

function SearchBlock({ placeholder, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="d-flex col-md-4 mx-3"
            role="search">
            <input className="form-control me-2" type="search"
                placeholder={placeholder} aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    )
}

export default SearchBlock;
