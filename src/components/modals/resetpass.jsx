import React from 'react'
import './resetpass.css';

function ResetModal({closeModal}){
    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="title">
                    <h1>Confirmation</h1>
                </div>
                <div className="body">
                    <p>Thank you! An email has been sent for you to reset your password</p>
                </div>
                <div className="footer">
                    <button onClick={() => closeModal(false)}> Okay </button>
                </div>
            </div>
        </div>
    )
}
export default ResetModal
