import React, { useState } from 'react';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './changepass.css';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import { RiEyeFill } from 'react-icons/ri';
import { AiFillEyeInvisible } from 'react-icons/ai';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const handleNewPasswordChange = (e) => {
      setNewPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const toggleNewPasswordVisibility = () => {
      setShowNewPassword(!showNewPassword);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
  
    return (
      <>
        <main>
          <div className='changepasspage'>
            <div id='register-logo'>
              <DiaLogo src={ClientLogo} />
            </div>
  
            <div id='register-form'>
              <Head2 text='Create New Password'></Head2>
              <div className='new-password'>
                <h3>Enter a new password below to change your password</h3>
  
                <div className='password-container'>
                  <input type={showNewPassword ? 'text' : 'password'} placeholder='New Password' value={newPassword} onChange={handleNewPasswordChange} className='changepassword-field'/>
                  <button className='change-toggle-eye' onClick={toggleNewPasswordVisibility}>
                    {showNewPassword ? (<RiEyeFill />) : (<AiFillEyeInvisible />)}
                  </button>
                </div>
  
                <div className='password-container'>
                  <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} className='changepassword-field'/>
                  <button className='change-toggle-eye' onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? (<RiEyeFill />) : (<AiFillEyeInvisible />)}
                  </button>
                </div>
  
                <Button label='Send' type='submit' />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }