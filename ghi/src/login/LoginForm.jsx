import React, { useState } from "react";


function LoginForm({ setAlert, quantumAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const redirect = (role) => window.location.href = '/' + role;

  /**
   * Handles the form submission for login.
   *
   * @param {Event} event - The event object.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    const url = `${quantumAuth.baseUrl}/token`;
    const form = new FormData();
    form.append("username", username + "::" + role);
    form.append("password", password);
    let res = await fetch(url, { method: "post", credentials: "include", body: form });
    if (res.status !== 200) return setAlert('Invalid login');
    res = await fetch(url, { method: "get", credentials: "include" });
    let auth = await res.json();
    quantumAuth.setAuthentication(auth);
    e.target.reset();
    redirect(role)
  }


  /**
    * Handles the change event for the form.
    *
    * @param {Event} event - The event object.
    * @param {String} event.target.id - The id of the input field.
    * @param {String} event.target.value - The value of the input field.
    */
  function handleOnChange(event) {
    const { id, value, name } = event.target;
    if (id === 'username') {
      setUsername(value);
    } else if (id === 'password') {
      setPassword(value);
    } else if (name === 'role') {
      setRole(value);
    }
  }

  // no need to login if authenticated
  if (quantumAuth.isAuthenticated()) {
    redirect(quantumAuth.getAuthentication().account.role);
  }
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} onChange={handleOnChange} id="sign-in-form">
            {/* sign selector */}
            <div className="d-flex mb-5">
              <div className="col-6 h2">Sign In</div>
              <div className="form-check col-6 d-flex justify-content-between align-items-center">
                <div>
                  <input className="form-check-input" type="radio" required
                    name="role" id="buyer" value="buyer" />
                  <label className="form-check-label" htmlFor="buyer">Buyer</label>
                </div>
                <div>
                  <input className="form-check-input" type="radio" required
                    name="role" id="vendor" value="vendor" />
                  <label className="form-check-label" htmlFor="vendor">Vendor</label>
                </div>
              </div>
            </div>
            {/* actual form */}
            <div className="d-flex flex-column mb-3">
              <div className="col-12 my-3">
                <input type="text" className="form-control" id="username"
                  required placeholder="Username" />
              </div>
              <div className="col-12 my-3">
                <input type="password" className="form-control" id="password"
                  required placeholder="Password" />
              </div>
            </div>
            <button className="btn">Sign In</button>
          </form>
        </div>
        <div className="col-12 col-md-6 logo-signup">
          <img src="/img/logo_light_bg.png" alt="coffee log" width={"70%"}></img>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
