import React from "react";


function LogoutBtn({ quantumAuth }) {

    function handleClick(e) {
        const url = `${quantumAuth.baseUrl}/token`;
        fetch(url, { method: "delete", credentials: "include" })
            .then(() => {
                quantumAuth.setAuthentication(null);
                // Delete old browser's token
                document.cookie =
                    "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            })
            .catch((e) => { console.log(e); });
    }

    return (
        <div><a onClick={handleClick} href="/" className="btn btn-sm">Logout</a></div>
    );
}


export default LogoutBtn;
