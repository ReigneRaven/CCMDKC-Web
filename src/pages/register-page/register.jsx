import React, { useState } from 'react';
import './register.css'
import Head2 from '../../components/headers/header'
import '../../components/headers/header.css'
import InputField from '../../components/textfield/textfield'
import Button from '../../components/buttons/button'
import DiaLogo from '../../components/logo/logo'
import ClientLogo from '../../assets/ccmdkc-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import Terms from '../../components/modals/terms';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Register() {


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/patient');
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date()); // Initialize birthdate with a default date
  

 
  

  const handleBirthdateChange = (date) => {
    setBirthdate(date);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTermsLinkClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      setOpenModal(true);
      setName(name);
  };

  return (
    <>
      <main>
        <div className='registerpage'>
          <div id='register-logo'><DiaLogo src={ClientLogo} /></div>

          <div id='register-form'>
            <form onSubmit={handleSubmit}>
              <Head2 text="Register"></Head2>

              <InputField placeholder=" Name" 
              className="user-input"
              value={name}
              autoComplete ="off"
              onChange={(e) => setName(e.target.value)}/>

                <div className="form1">
                  <DatePicker placeholderText="Birthdate" 
                  className="user-input"
                  selected={birthdate} 
                  onChange={handleBirthdateChange}/>

                <label className="user-input-label">
                  <select className="user-input" defaultValue="" set>
                    <option value="" disabled hidden>Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>

                </div>
              <InputField placeholder=" Address" className="user-input" />
              <InputField placeholder=" Contact No." className="user-input" />
              <InputField placeholder=" Email" className="user-input" />
              <input type={showPassword ? 'text' : 'password'} placeholder=" Password" className="user-input" value={password} onChange={handlePasswordChange} />
              <div className="terms">
                <label className="show-password-label">
                  <input type="checkbox" id="showpass" checked={showPassword} onChange={togglePasswordVisibility} />{' '}&nbsp;Show&nbsp;Password
                </label>
                <Link onClick={handleTermsLinkClick}><p>Terms of Use and Privacy Policy</p></Link>
                {openModal && <Terms closeModal={handleCloseModal} />}
              </div>
              <Button label="Sign Up" onClick={(e) => handleClick()} />
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
