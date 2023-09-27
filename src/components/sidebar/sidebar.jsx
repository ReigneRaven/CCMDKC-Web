import React, { useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import Router and Link from react-router-dom
import './sidebar.css';
import Profile from '../../assets/profile.png';
import User from '../../assets/user.svg';
import Password from '../../assets/changepassword.svg';
import Logout from '../../assets/logout.svg';

function Sidebar() {

    const [open, setOpen] = useState(false);
    
    return (
        <div className="Sidebar">
            <div className="menu-container">
                <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                    <img src={Profile} alt="Profile"></img>
                </div>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                    <h3>Park Chanyeol<br/><span>Patient</span></h3>
                    <ul>
                        {/* Use Link component */}
                        <Link to="/"><PatientMenu img={User} text="My Profile" /></Link>
                        <Link to="/"><PatientMenu img={Password} text="Change Password" /></Link>
                        <Link to="/"><PatientMenu img={Logout} text="Logout"/></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// Pass props as an argument to the function
function PatientMenu(props) {
    return (
        <li className="dropdownItem">
            <img src={props.img} alt={props.text}></img>
            <a>{props.text}</a>
        </li>
    );
}

export default Sidebar;
