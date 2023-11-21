import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function MainPage({ setAlert, quantumAuth }) {
  // redirect to the role page if authenticated
  const navigate = useNavigate();
  const authenticated = quantumAuth.isAuthenticated();

  useEffect(() => {
    async function checkLogin() {
      if (quantumAuth.isAuthenticated()) {
        navigate('/' + quantumAuth.getAuthentication().account.role);
      }
    }
    checkLogin();
  }, [quantumAuth, navigate]);

  // If authenticated, don't show anything
  if (authenticated) return null;

  return (
    <div>
      <div className="d-flex flex-column flex-md-row">
        <div className="d-flex justify-content-center align-items-center hero-interaction flex-column col-12 col-md-6 ">
          <img src="/img/logo_dark_bg.png" alt="coffee logo" width={"33%"}></img>
          <div className="h4 my-5 text-center">A unique community of coffee enthusiasts</div>
          <div className="d-flex">
            <a className="btn" href="/signup">Sign Up</a>
            <a className="btn" href="/login">Login</a>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <img src="/img/hero_img.png" alt="coffee" width={"100%"}></img>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
