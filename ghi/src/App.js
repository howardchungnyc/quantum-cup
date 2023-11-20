import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Nav";
import MainPage from "./MainPage";
import Footer from './Footer';
import SignupForm from "./signup/SignupForm";
import LoginForm from "./login/LoginForm";
import VendorPage from "./vendors/VendorPage";
import BuyerPage from "./buyers/BuyerPage";
import LogoutBtn from './logout/LogoutBtn';
import { useState } from "react";


const baseUrl = process.env.REACT_APP_API_HOST;


function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [type, setType] = useState('');
  // const [auth, setAuth] = useState(null);

  // const setAuthentication = (auth) => setAuth(auth);
  // const getAuthentication = () => auth;
  const setAuthentication = (auth) =>
    window.sessionStorage.setItem('quantum_token', JSON.stringify(auth));
  const getAuthentication = () => JSON.parse(window.sessionStorage.getItem('quantum_token') || 'null');
  const isAuthenticated = () => getAuthentication() !== null;
  const quantumAuth = { isAuthenticated, setAuthentication, baseUrl, getAuthentication };


  /**
   * Handles the closing of the alert.
   */
  function handleAlertClose() {
    setShowAlert(false);
    setAlertMessage('');
  };

  /**
   * Sets the alert message and shows the alert. This is a dismissable alert.
   *
   * @param {String} message - The message to display in the alert.
   * @param {Boolean} success - Whether the alert is a success or error alert.
   */
  function setAlert(message, success = false) {
    setAlertMessage(message);
    if (success) {
      setType('alert-success');
    } else {
      setType('alert-danger');
    }
    setShowAlert(true);
  }


  return (
    <BrowserRouter>
      <Nav quantumAuth={quantumAuth} />
      {showAlert && !window.scrollTo(0, 0) && (
        <div className={"alert " + type + " alert-dismissible fade show"} role="alert">
          {alertMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={handleAlertClose}></button>
        </div>
      )}
      <div>
        <Routes>
          <Route path="/" element={<MainPage setAlert={setAlert} quantumAuth={quantumAuth} />} />
          <Route path="/signup" element={<SignupForm setAlert={setAlert} quantumAuth={quantumAuth} />} />
          <Route path="/login" element={<LoginForm setAlert={setAlert} quantumAuth={quantumAuth} />} />
          <Route path="/logout" element={<LogoutBtn setAlert={setAlert} quantumAuth={quantumAuth} />} />
          <Route path="/vendor" element={<VendorPage setAlert={setAlert} quantumAuth={quantumAuth} />} />
          <Route path="/buyer" element={<BuyerPage setAlert={setAlert} quantumAuth={quantumAuth} />} />
          {/* {console.log(quantumAuth.getAuthentication())} */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
