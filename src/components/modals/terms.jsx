import React from 'react';
import './terms.css';
import { useNavigate } from 'react-router';
import axios from 'axios'
import { useEffect } from 'react';

function Terms({ closeModal }) {
  
  const navigate = useNavigate();

  const handleCancelClick = () => {
    closeModal(false);
    navigate('/');
  };

  const handleOkayClick = () => {
    closeModal(false);
    navigate('');
  };

  return (
    <div className="background">
      <div className="container">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Terms of Use and Privacy Policy</h1>
        </div>
        <div className="body">
          <div className="scrollable-content">
            <p>
              The Cipriana Coquia Memorial Dialysis Kidney Center website is given to you subject to the following terms and
              conditions: You accept the terms and conditions set forth above by accessing or using this website and its
              services. <br />
              <br />
              1. Acceptance of terms<br /><br />
              You acknowledge that you have read, understood, and agreed to be bound by these terms and conditions by
              accessing or using this website. Please refrain from using this website if you do not agree to these terms.<br />
              <br />
              2. Access and User Accounts<br /><br />
              2.1  Access to this website is restricted to authorized users only, which may include healthcare professionals, staff and registered patient of Cipriana Coquia Memorial Dialysis Kidney Center.<br /><br />
              2.2. Users are accountable for all actions taken under their accounts and for maintaining the secrecy of their login information. If users detect any illegal use of their accounts, they must contact us right away.<br />
              <br />
              3. Data Privacy<br /><br />
              3.1. Our Privacy Policy, which regulates the gathering, use, and protection of personal and medical data, applies to the use of this website. You agree to the procedures outlined in our Privacy Policy by using the website.<br />
              <br />
              4. User Responsibilities<br /><br />
              4.1. When using our services, you consent to providing information that is true to the best of your knowledge, comprehensive, and up-to-date.<br /><br />
              4.2. You are in charge of protecting the privacy of your login information and of any actions taken using your account.<br />
              <br />5.  Intellectual Property<br /><br />
              5.1. The information, pictures, logos, and trademarks on this website are all the property of Cipriana Coquia Memorial Dialysis Kidney Center and are shielded from infringement by intellectual property laws. Without our prior written approval, you may not utilize our content.<br />
              <br />6. Restrictions on Liability<br /><br />
              6.1. In the event that you utilize our services, neither Cipriana Coquia Memorial Dialysis Kidney Center nor any of its affiliates or employees will be responsible for any direct, indirect, incidental, special, or consequential damages.<br />
              <br />7. Terms and Conditions Modifications<br /><br />
              7.1. From time to time, we could alter these terms. The most recent version will always be available on our website, and by using our services after any modifications have been made, you agree to the updated terms.
            </p>
          </div>
        </div>
        <div className="footer">
          <button onClick={handleCancelClick}> Decline </button>
          <button onClick={handleOkayClick}> Accept </button>
        </div>
      </div>
    </div>
  );
}

export default Terms;