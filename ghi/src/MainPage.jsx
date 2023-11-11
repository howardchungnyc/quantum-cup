import React from "react";


function MainPage() {
  return (
    <div>
      <div className="d-flex flex-column flex-md-row">
        <div className="d-flex justify-content-center align-items-center hero-interaction flex-column col-12 col-md-6 ">
          <img src="/img/logo_dark_bg.png" alt="coffee logo" width={"33%"}></img>
          <div className="h4 my-5">A unique community of coffee enthusiasts</div>
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
