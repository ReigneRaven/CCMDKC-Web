import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Head2 from '../../components/headers/header';
import ResetModal from '../../components/modals/resetpass';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import axios from 'axios';
import '../../components/headers/header.css';
import './forgotpass.css'


export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting and page reloading
        if (loading) return;
        setLoading(true);
        axios.post('http://localhost:5000/api/user/forgotpassword', {email})
        .then((userResponse)=> {
            console.log('User Response: ', userResponse);
            setOpenModal(true);
            setLoading(false);
            navigate('/resetpassword')
        })
        .catch((userError) => {
            setLoading(false);
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
                            <h3>Please enter the email address you&apos;d <br/> like your password reset information sent to.</h3>
                            <div className="forgotpass-input">
                                <input 
                                value= {email}
                                placeholder=" Email Address" 
                                className="user-input" required
                                onChange={handleEmailChange}
                                id="forgotpass-inputfield"
                                />
                            </div>
                            <Button id="forgot-send-btn" label={loading ? "Loading..." : "Send"} type="submit" /> 
                        </form>
                        {openModal && <ResetModal closeModal={setOpenModal} />}
                    </div>
                </div>
            </main>
        </>
    );
}
    