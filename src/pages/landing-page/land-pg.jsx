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

export default function Landing() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    navigate('/patient');
  };

  return (
    <>
      <main>
        <div className="homepage">
          <div id="home-pic">
            <DiaLogo src={ClientBuilding} />
          </div>

          <div id="home-form">
            <form>
              <div id="home-logo">
                <DiaLogo src={ClientLogo} />
              </div>

                <Head2 text="Sign in"></Head2>
              <div className="form-input">
                <InputField placeholder=" Username" className="user-input" />
                <input type={showPassword ? 'text' : 'password'} placeholder=" Password" className="user-input" value={password} onChange={handlePasswordChange}/>
              </div>
              
              <div className="password-options">
                <div className="options">
                  <label className="show-password-label">
                  <input type="checkbox" id="showpass" checked={showPassword} onChange={togglePasswordVisibility}/>{' '}&nbsp;Show&nbsp;Password</label>
                  <Link to="/forgotpassword">
                    <p>Forgot Password?</p>
                  </Link>
                </div>
              </div>
                <Button label="Login" onClick={(e) => handleClick()} />
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
