import React, { useState } from 'react';
import './land-pg.css';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import InputField from '../../components/textfield/textfield';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import ClientBuilding from '../../assets/ccmdkc-bldg.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RiEyeFill } from 'react-icons/ri';
import { AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

export default function Landing() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 

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
  .post('http://localhost:5000/api/user/login', { email, password })
  .then((userResponse) => {
    console.log('User Response: ', userResponse);
    const { token, userId, isUser, name } = userResponse.data;

    // Store user token in localStorage
    if (userId) {
      localStorage.setItem('userToken', token);
      localStorage.setItem('userId', userId); // Store user ID in localStorage
      localStorage.setItem('isUser', isUser); // Store user role in localStorage
      localStorage.setItem('userName', name);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redirect to user page with the user ID parameter
      window.location.href = `/patient/${userId}`;
  } else {
      console.error('User ID not found in the response');
  }
})
.catch((userError) => {
  console.error('User Login Error: ', userError);
});

// Admin login request
axios
  .post('http://localhost:5000/api/admin/login', { email, password })
  .then((adminResponse) => {
    console.log('Admin Response: ', adminResponse);
    const { token } = adminResponse.data;

    // Store admin token in localStorage
    localStorage.setItem('adminToken', token);

    // Redirect to admin page
    window.location.href = '/admin';
  })
  .catch((adminError) => {
    console.error('Admin Login Error: ', adminError);
  });
};


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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" Email"
                  className="user-input"
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
  );
}