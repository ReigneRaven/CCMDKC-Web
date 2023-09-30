import React, { useState } from 'react';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './forgotpass.css'
import ResetModal from '../../components/modals/resetpass';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [openModal, setOpenModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting and page reloading
        setOpenModal(true);
    };

    return (
        <>
            <main>
                <div className='forgotpage'>
                    <div id='forgotpass-logo'><DiaLogo src={ClientLogo} /></div>

                    <div id='forgotpass-form'>
                        <form onSubmit={handleSubmit}>
                            <Head2 text="Forgot Password"></Head2>
                            <h3>Please enter the email address you'd like your password reset information sent to.</h3>
                            <div className="forgotpass-input">
                                <input placeholder=" Email Address" className="user-input" required/>
                            </div>
                            <Button label="Send" type="submit" /> 
                        </form>
                        {openModal && <ResetModal closeModal={setOpenModal} />}
                    </div>
                </div>
            </main>
        </>
    );
}