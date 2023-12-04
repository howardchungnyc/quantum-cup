import React from "react";
import { useNavigate } from 'react-router-dom';


function LogoutBtn({ quantumAuth }) {
    const navigate = useNavigate();

    function handleClick(e) {
        const url = `${quantumAuth.baseUrl}/token`;
        fetch(url, { method: "delete", credentials: "include" })
            .then(() => {
                quantumAuth.setAuthentication(null);
                // Delete old browser's token
                document.cookie =
                    "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    navigate('/');
            })
            .catch((e) => { console.log("logout error:", e); });
    }

    return (
        <div><a onClick={handleClick} href="/" className="btn btn-md">Logout</a></div>
    );
}


export default LogoutBtn;
