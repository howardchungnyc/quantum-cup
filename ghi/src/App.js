import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Nav from "./Nav";
import MainPage from "./MainPage";
import Footer from './Footer';
import SignupForm from "./signup/SignupForm";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
      <Nav />
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={handleAlertClose}></button>
        </div>
      )}
      <div>
        <Routes>
          <Route path="/" element={<MainPage setAlert={setAlert} />} />
          <Route path="/signup" element={<SignupForm setAlert={setAlert} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
