import React, { useState } from 'react';
import './register.css';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import InputField from '../../components/textfield/textfield';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Terms from '../../components/modals/terms';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiEyeFill } from 'react-icons/ri';
import { AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [birthday, setBirthday] = useState(new Date());
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleBirthdayChange = (date) => {
    setBirthday(date);
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
    e.preventDefault();

    if (password !== confirmpassword) {
      alert('Password and Confirm Password do not match.');
    } else {
      axios
        .post('http://localhost:5000/api/user', {
          name,
          birthday,
          sex,
          address,
          contactNum,
          email,
          password,
          confirmpassword,
        })
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
            window.location.href = `/patient/myprofile/${userId}`;
          } else {
            console.error('User ID not found in the response');
          }
        })
        .catch((userError) => {
          console.error('User Registration Error: ', userError);
        });
    }
  };

  return (
    <>
      <main>
        <div className="registerpage">
          <div id="register-logo">
            <DiaLogo src={ClientLogo} />
          </div>
          <div id="register-form">
            <form onSubmit={handleSubmit}>
              <Head2 text="Register" />

              <div className="name-container">
                <div className="form-group">
                  <label htmlFor="firstName" className="name-input-label">
                    First Name<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="firstName"
                    placeholder=" First Name"
                    className="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="MiddleName" className="name-input-label">
                    Middle Name<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="MiddleName"
                    placeholder=" Middle Name"
                    className="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="name-input-label">
                    Last Name<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="lastName"
                    placeholder=" Last Name"
                    className="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form1">
                <div className="form-group">
                  <label>Birthday</label> <span className="asterisk-birthday">*</span>
                  <DatePicker
                    id="date"
                    placeholder=" Birthday"
                    className="user-input"
                    selected={birthday}
                    onChange={handleBirthdayChange}
                  />
                </div>
                <div className="form-group">
                  <label>Sex</label> <span className="asterisk-sex">*</span>
                  <select
                    id="sex"
                    className="user-input"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Sex
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Contact No.</label> <span className="asterisk-contact">*</span>
                  <InputField
                    id="num"
                    placeholder=" Contact No."
                    className="user-input"
                    value={contactNum}
                    onChange={(e) => setContactNum(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="address-container">
                <div className="form-group">
                  <label htmlFor="house" className="user-input-label house-input-label">
                    House no.<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="house"
                    placeholder=" House no."
                    className="user-input house-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="street" className="user-input-label">
                    Street<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="street"
                    placeholder=" Street"
                    className="user-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="barangay" className="user-input-label">
                    Barangay<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="barangay"
                    placeholder=" Barangay"
                    className="user-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="municipality" className="user-input-label">
                    Municipality<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="municipality"
                    placeholder=" Municipality"
                    className="user-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="province-city" className="user-input-label">
                    Province/City<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="province-city"
                    placeholder=" Province/City"
                    className="user-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="useremail-container">
                <div className="form-group">
                  <label htmlFor="email" className="user-input-label">
                    Email<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="email"
                    placeholder=" Email"
                    className="user-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="user-input-label">
                    Username<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="username"
                    placeholder=" Username"
                    className="user-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="password-container">
                <div className="form-group password-input">
                  <label htmlFor="pass" className="password-label">
                    Password<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="pass"
                    type={showPassword ? 'text' : 'password'}
                    placeholder=" Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <div className="toggle-eye" onClick={() => togglePasswordVisibility('password')}>
                    {showPassword ? <RiEyeFill /> : <AiFillEyeInvisible />}
                  </div>
                </div>

                <div className="form-group password-input-container">
                  <label htmlFor="confirmpass" className="password-label">
                    Confirm Password<span className="asterisk">*</span>
                  </label>
                  <InputField
                    id="confirmpass"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder=" Confirm Password"
                    value={confirmpassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />

                  <div
                    className="toggle-eye-confirm"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    {showConfirmPassword ? <RiEyeFill /> : <AiFillEyeInvisible />}
                  </div>
                </div>
              </div>

              <div className="terms">
                <Link onClick={handleTermsLinkClick}>
                  <p>Terms of Use and Privacy Policy</p>
                </Link>
                {openModal && <Terms closeModal={handleCloseModal} />}
              </div>
              <Button label="Sign Up" type="submit" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
