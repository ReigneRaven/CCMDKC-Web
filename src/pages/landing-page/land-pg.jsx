import React, { useState } from 'react';
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

export default function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/patient');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Here, you can perform actions with the form data if needed
    console.log('Form submitted with username:', e.target.username.value);
    console.log('Form submitted with password:', e.target.password.value);
    // Redirect or perform other actions as necessary
    handleClick();
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
                <InputField name="username" placeholder=" Username" className="user-input" />
                <div className="password-input">
                  <div className="input-container">
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder=" Password" className="user-input password-field" value={password} onChange={handlePasswordChange}/>
                    <div className="toggle-eye" onClick={togglePasswordVisibility}>
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
              <Button label="Login" type="submit" onClick={(e) => handleClick()} />
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