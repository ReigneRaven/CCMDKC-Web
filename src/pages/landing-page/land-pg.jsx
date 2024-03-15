import React, { useState, useEffect } from 'react';
import './land-pg.css';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import InputField from '../../components/textfield/textfield';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import ClientBuilding from '../../assets/ccmdkc-bldg.png';
import { Link, useNavigate } from 'react-router-dom';
import { RiEyeFill } from 'react-icons/ri';
import { AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function Landing() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [UserName, setUserName] = useState('');
 

  useEffect(() => {
    const adminToken = Cookies.get('adminToken');
    const adminId = Cookies.get('adminId');

    const userToken = Cookies.get('userToken');
    const userId = Cookies.get('userId');

    if (adminToken && adminId && adminToken !== undefined && adminId !== undefined) {
      navigate(`/admin/${adminId}`)  
    }

    if (userToken && userId  && userToken !== undefined && userId !== undefined) {
      navigate(`/patient/${userId}`)
    }
    

  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // User login request
  axios
  .post('http://localhost:5000/api/user/login', { UserName, password })
  .then((userResponse) => {
    console.log('User Response: ', userResponse);
    const { token , userId} = userResponse.data;

      Cookies.set('userToken', token)
      Cookies.set('userId', userId)

      if (userId === undefined) return;
      navigate(`/patient/${userId}`)
  })

.catch((userError) => {
  toast('Wrong User Credentials')
  console.error('User Login Error: ', userError);
})

// Admin login request
axios
  .post('http://localhost:5000/api/admin/login', { UserName, password })
  .then((adminResponse) => {  
    console.log('Admin Response: ', adminResponse);
    const { token, adminId } = adminResponse.data;

    // Store admin token in localStorage
    Cookies.set('adminToken', token);
    Cookies.set('adminId', adminId);

    // Redirect to admin page
    if (adminId === undefined) return;
    navigate(`/admin/${adminId}`)
  })
  .catch((adminError) => {
    toast('Wrong User Credentials');
    console.error('Admin Login Error: ', adminError);
    // console.log('Admin Response: ', adminResponse);
  });
  }

  return (
    <>
      <main>
        <div className="homepage">
          <div id="home-pic">
            <DiaLogo src={ClientBuilding} />
          </div>

          <div id="home-form">
            <form onSubmit={handleSubmit}>
              <div id="home-logo">
                <DiaLogo src={ClientLogo} />
              </div>

              <Head2 text="Sign in"></Head2>
              <div className="login-input">
                <InputField
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder=" Username"
                  className="user-input"
                  id="login-inputfield"
                />
                <div className="password-login">
                  <div className="input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder=" Password"
                      className="user-input password-field"
                      value={password}
                      onChange={handlePasswordChange}
                      id="password-inputfield"
                    />
                    <div className="toggle-eye-login" onClick={togglePasswordVisibility}>
                      {showPassword ? <RiEyeFill /> : <AiFillEyeInvisible />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="password-options">
                <div className="options">
                  <Link to="/forgotpassword">
                    <p>Forgot Password?</p>
                  </Link>
                </div>
              </div>
              <Button label="Login" type="submit" onClick={(e) => handleSubmit(e)} />
            </form>
            <div id="home-reg">
              <p>Don't have an account?&nbsp;</p>
              <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )}