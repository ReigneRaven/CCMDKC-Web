import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Head2 from '../../components/headers/header';
import ResetModal from '../../components/modals/resetpass';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import axios from 'axios';
import '../../components/headers/header.css';
import './resetpass.css'


export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting and page reloading
        if (loading) return;
        setLoading(true);
        axios.post('http://localhost:5000/api/user/resetpassword', {email, resetToken, newPassword})
        .then((userResponse)=> {
            console.log('User Response: ', userResponse);
            setOpenModal(true);
            setLoading(false);
            navigate('/')
        })
        .catch((userError) => {
            setLoading(false);
            console.error('Error in sending email: ', userError);
          });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleResetTokenChange = (e) => {
        setResetToken(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };


    return (
        <>
            <main>
                <div className='resetpage'>
                    <div id='resetpass-logo'><DiaLogo src={ClientLogo} /></div>

                    <div id='resetpass-form'>
                        <form onSubmit={handleSubmit}>
                            <Head2 text="Reset Password"></Head2>
                            <h3>Please enter the email address you&apos;d <br/> like your password reset information sent to.</h3>
                            <div className="resetpass-input">
                                <input 
                                value= {email}
                                placeholder=" Email Address" 
                                className="user-input" required
                                onChange={handleEmailChange}
                                id="resetpass-inputfield"
                                />
                            </div>
                            <div className="resetpass-input">
                                <input 
                                value= {resetToken}
                                placeholder=" Reset Token" 
                                className="user-input" required
                                onChange={handleResetTokenChange}
                                id="resetpass-inputfield"
                                />
                            </div>
                            <div className="resetpass-input">
                                <input 
                                type='password'
                                value= {newPassword}
                                placeholder=" New Password" 
                                className="user-input" required
                                onChange={handleNewPasswordChange}
                                id="resetpass-inputfield"
                                />
                            </div>
                            <Button label={loading ? "Loading..." : "Send"} type="submit" /> 
                        </form>
                        {openModal && <ResetModal closeModal={setOpenModal} />}
                    </div>
                </div>
            </main>
        </>
    );
}
    