import React, { useState} from 'react';
import './register.css';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import InputField from '../../components/textfield/textfield';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import { Link, useNavigate, useParams} from 'react-router-dom';
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
          confirmpassword
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
  }

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
              <InputField
                id="fullName"
                placeholder="Full Name"
                className="user-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="form1">
                <DatePicker
                id="date"
                  placeholderText="Birthday"
                  className="user-input"
                  selected={birthday}
                  onChange={handleBirthdayChange}
                />
                <label className="user-input-label">
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
                </label>
              </div>
              <InputField
                id="address"
                placeholder="Address"
                className="user-input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <InputField
                id="num"
                placeholder="Contact No."
                className="user-input"
                value={contactNum}
                onChange={(e) => setContactNum(e.target.value)}
                required
              />
              <InputField
                id="email"
                placeholder="Email"
                className="user-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="password-wrapper" id="register">
                <input
                  id="pass"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="user-input"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />

                <div
                  className="toggle-eye"
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword ? <RiEyeFill /> : <AiFillEyeInvisible />}
                </div>
              </div>
              <div className="password-wrapper" id="register">
                <input
                 id="confirmpass"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="user-input"
                  value={confirmpassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />

                <div
                  className="toggle-eye"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showConfirmPassword ? <RiEyeFill /> : <AiFillEyeInvisible />}
                </div>
              </div>
              <div className="terms">
                <Link onClick={handleTermsLinkClick}>
                  <p>Terms of Use and Privacy Policy</p>
                </Link>
                {openModal && <Terms closeModal={handleCloseModal} />}
              </div>
              <Button label="Sign Up" type="submit"/>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}