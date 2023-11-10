import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import MainPage from "./MainPage";
import SignupForm from "./SignupForm";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showNav, setShowNav] = useState(false);

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
   */
  function setAlert(message) {
    setAlertMessage(message);
    setShowAlert(true);
  }

  return (
    <BrowserRouter>
      <Nav showNav={showNav} />
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={handleAlertClose}></button>
        </div>
      )}
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage setShowNav={setShowNav} />} />
          <Route path="/signup" element={<SignupForm setAlert={setAlert} setShowNav={setShowNav} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
