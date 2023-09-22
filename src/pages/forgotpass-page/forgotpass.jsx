import React, { useState } from 'react';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import InputField from '../../components/textfield/textfield';
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
                    <div id='register-logo'><DiaLogo src={ClientLogo} /></div>

                    <div id='register-form'>
                        <form onSubmit={handleSubmit}>
                            <Head2 text="Forgot Password"></Head2>
                            <h3>Please enter the email address you'd like your password reset information sent to.</h3>
                            <div className="form1">
                                <InputField placeholder=" Email Address" className="user-input" required/>
                            </div>
                            <Button label="Send" type="submit" /> 
                        </form>
                        {openModal && <ResetModal closeModal={setOpenModal}/>}
                        <Link to='/'><p>Back to Login</p></Link>
                    </div>
                </div>
            </main>
        </>
    );
}
