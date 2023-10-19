import React from 'react'
import './resetpass.css';
import { useNavigate } from 'react-router-dom';

function ResetModal({closeModal}){

    const navigate = useNavigate();
    return(
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
                    <button onClick={() => closeModal(navigate('/'))}> Okay </button>
                </div>
            </div>
        </div>
    )
}
export default ResetModal
