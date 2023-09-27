import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './resetpass.css';

function ResetModal({ closeModal }) {
  const navigate = useNavigate(); // Create a navigate function

  const handleOkayClick = () => {
    closeModal(false);
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Sent!</h1>
        </div>
        <div className="body">
          <p>Thank you! An email has been sent for you to reset your password</p>
        </div>
        <div className="footer">
          <button onClick={handleOkayClick}> Okay </button> {/* Use the handleOkayClick function */}
        </div>
      </div>
    </div>
  );
}

export default ResetModal;
