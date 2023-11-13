import { React, useState } from "react";
import "./SignupForm.css";


function SignupForm({ setAlert }) {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPass) {
      setAlert('Passwords do not match');
      return;
    }
    const data = {
      role,
      username,
      password,
      email,
      fullname,
      street,
      city,
      state,
      zipcode
    }
    const URL = 'http://localhost:8000/signup';
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      mode: 'cors'
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = `/${role}`;
        } else {
          return response.json().then((json) => {
            throw new Error(json.message || "Something went wrong");
          });
        }
      })
      .catch((error) => {
        setAlert("Error: " + error.detail);
      });
  }

  function handleOnChangeForm(e) {
    switch (e.target.id) {
      case "buyer": // fallback on next case
      case "seller":
        setRole(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirm-pass":
        setConfirmPass(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "fullname":
        setFullname(e.target.value);
        break;
      case "street":
        setStreet(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "state":
        setState(e.target.value);
        break;
      case "zipcode":
        setZipcode(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit} onChange={handleOnChangeForm} id="sign-up-form">
            {/* sign selector */}
            <div className="d-flex mb-5">
              <div className="col-6 h2">Sign Up</div>
              <div className="form-check col-6 d-flex justify-content-between align-items-center">
                <div>
                  <input className="form-check-input" type="radio" required name="role" id="buyer" value="buyer" />
                  <label className="form-check-label" htmlFor="buyer">Buyer</label>
                </div>
                <div>
                  <input className="form-check-input" type="radio" required name="role" id="seller" value="seller" />
                  <label className="form-check-label" htmlFor="seller">Seller</label>
                </div>
              </div>
            </div>
            {/* actual form */}
            <div className="d-flex justify-content-between mb-3">
              <div className="col-5">
                <input type="text" className="form-control" id="username" required placeholder="Username" />
              </div>
              <div className="col-5">
                <input type="password" className="form-control" id="password" required placeholder="Password" />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div className="col-5"></div>
              <div className="col-5">
                <input type="password" className="form-control" id="confirm-pass" required placeholder="Confirm Password" />
              </div>
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" id="email" required placeholder="Email" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="fullname" required placeholder="Full Name" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="street" required placeholder="Street" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="city" required placeholder="City" />
            </div>
            <div className="d-flex justify-content-between mb-5">
              <div className="col-5">
                <input type="text" className="form-control" id="state" required placeholder="State" />
              </div>
              <div className="col-5">
                <input type="number" className="form-control" id="zipcode" required placeholder="Zip Code" />
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
