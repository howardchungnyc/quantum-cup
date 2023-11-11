import React from "react";

function SignupForm() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="text-center">Sign Up</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form id="sign-up-form">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" />
            </div>
            <button className="btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupForm;
