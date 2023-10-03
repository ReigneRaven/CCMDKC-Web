import React, { useEffect, useState } from 'react';
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
import { RiEyeFill } from 'react-icons/ri';
import { AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios'

export default function Register() {

  const fetchUser = async() =>{
    const data = await axios.post('/api/user/');
    
    console.log(data)
  }
  useEffect(() => {
    fetchUser();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [birthday, setBirthdate] = useState(new Date());
  const [sex, setSex] = useState()
  const [address, setAddress] = useState()
  const [contact_no, setContactNo] = useState()
  const [email, setEmail] = useState()
  let [name, setName] = useState()

  const handleBirthdateChange = (date) => {
    setBirthdate(date);
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTermsLinkClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5000/api/user',
      name = 'aaa',
      birthday,
      sex,
      address,
      contact_no,
      email,
      password
    )
    .then(userResult => {
      console.log('User: ', userResult)
    })
    .catch(err => {
      console.log('Login error: ', err)
    })

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <main>
        <div className='registerpage'>
          <div id='register-logo'><DiaLogo src={ClientLogo} /></div>

          <div id='register-form'>
            <form onSubmit={handleSubmit}>
              <Head2 text="Register"></Head2>
              <InputField placeholder=" Full Name"  className="user-input" />
              <div className="form1">
                <DatePicker placeholderText="Birthdate" className="user-input" onChange={handleBirthdateChange} />
                <label className="user-input-label">
                  <select className="user-input" value={sex} defaultValue="">
                    <option value="" disabled hidden>Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>
              <InputField placeholder=" Address"  className="user-input" />
              <InputField placeholder=" Contact No."  className="user-input" />
              <InputField placeholder=" Email"  className="user-input" />
              <div className="password-wrapper" id="register">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="user-input" value={password} onChange={handlePasswordChange}/>
                <div className="toggle-eye" onClick={() => togglePasswordVisibility('password')}>
                  {showPassword ? <RiEyeFill /> : <AiFillEyeInvisible />}
                </div>
              </div>
              <div className="password-wrapper" id="register">
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" className="user-input" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                <div className="toggle-eye" onClick={() => togglePasswordVisibility('confirmPassword')}>
                  {showConfirmPassword ? <RiEyeFill /> : <AiFillEyeInvisible />}
                </div>
              </div>
              <div className="terms">
                <Link onClick={handleTermsLinkClick}><p>Terms of Use and Privacy Policy</p></Link>
                {openModal && <Terms closeModal={handleCloseModal} />}
              </div>
              <Button label="Sign Up" type="submit" />
            </form>
          </div>
        </div>
      </main>
    </>
  )
}