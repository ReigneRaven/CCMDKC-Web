import React from 'react';
import { useNavigate } from 'react-router-dom';
import './resetpass.css';

function ResetModal({ closeModal }) {
  const navigate = useNavigate();

  const handleOkayClick = () => {
    closeModal(false);
    navigate('/');
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
          <button onClick={handleOkayClick}> Okay </button>
        </div>
      </div>
    </div>
  );
}

export default ResetModal;
