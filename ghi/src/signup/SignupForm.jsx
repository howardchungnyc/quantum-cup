import React from "react";
import "./SignupForm.css";

function SignupForm({ setAlert }) {
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row">
        <div className="col-12 col-md-6">
          <form id="sign-up-form">
            {/* sign selector */}
            <div className="d-flex mb-5">
              <div className="col-6 h2">Sign Up</div>
              <div className="form-check col-6 d-flex justify-content-between align-items-center">
                <div>
                  <input className="form-check-input" type="radio" name="role" id="buyer" value="buyer" />
                  <label className="form-check-label" htmlFor="buyer">Buyer</label>
                </div>
                <div>
                  <input className="form-check-input" type="radio" name="role" id="seller" value="seller" />
                  <label className="form-check-label" htmlFor="seller">Seller</label>
                </div>
              </div>
            </div>
            {/* form */}
            <div className="d-flex justify-content-between mb-3">
              <div className="col-5">
                <input type="text" className="form-control" id="username" placeholder="Username" />
              </div>
              <div className="col-5">
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div className="col-5"></div>
              <div className="col-5">
                <input type="password" className="form-control" id="confirm-pass" placeholder="Confirm Password" />
              </div>
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="fullname" placeholder="Full Name" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="street" placeholder="Street" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="city" placeholder="City" />
            </div>
            <div className="d-flex justify-content-between mb-5">
              <div>
                <input type="text" className="form-control" id="state" placeholder="State" />
              </div>
              <div>
                <input type="number" className="form-control" id="zipcode" placeholder="Zip Code" />
              </div>
            </div>
            <button className="btn">Sign Up</button>
          </form>
        </div>
        <div className="col-12 col-md-6 logo-signup">
          <img src="/img/logo_light_bg.png" alt="coffee log" width={"70%"}></img>
        </div>
      </div>
    </div>
  )
}

export default SignupForm;
