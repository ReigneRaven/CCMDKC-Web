import React from 'react'
import './terms.css';

function Terms({closeModal}){
    return(
        <div className="background">
            <div className="container">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="title">
                    <h1>Terms of Use and Privacy Policy</h1>
                </div>
                <div className="body">
                    <p>Thank you! An email has been sent for you to reset your password</p>
                </div>
                <div className="footer">
                    <button onClick={() => closeModal(false)}> Decline </button>
                    <button onClick={() => closeModal(false)}> Accept </button>
                </div>
            </div>
        </div>
    )
}
export default Terms