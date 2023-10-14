import React, { useState } from 'react';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './forgotpass.css'
import ResetModal from '../../components/modals/resetpass';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgotPassword() {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting and page reloading
        setOpenModal(true);

        axios.post('http://localhost:5000/api/user/forgotpassword', {email})
        .then((userResponse)=> {
            console.log('User Response: ', userResponse);
            navigate('/patient/changepassword/:id')
        })
        .catch((userError) => {
            console.error('Error in sending email: ', userError);
          });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    return (
        <>
            <main>
                <div className='forgotpage'>
                    <div id='forgotpass-logo'><DiaLogo src={ClientLogo} /></div>

                    <div id='forgotpass-form'>
                        <form onSubmit={handleSubmit}>
                            <Head2 text="Forgot Password"></Head2>
                            <h3>Please enter the email address you'd <br/> like your password reset information sent to.</h3>
                            <div className="forgotpass-input">
                                <input 
                                value= {email}
                                placeholder=" Email Address" 
                                className="user-input" required
                                onChange={handleEmailChange}/>
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
    