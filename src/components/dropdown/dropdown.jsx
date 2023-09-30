import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import Router and Link from react-router-dom
import './dropdown.css';
import Profile from '../../assets/profile.png';
import User from '../../assets/user.svg';
import Logout from '../../assets/logout.svg';

function Dropdown({name}) {
    
    const [open, setOpen] = useState(false);
    
    return (
        <div className="Sidebar">
            <div className="menu-container">
                <div className="menu-trigger" onClick={()=>{setOpen(!open)}}>
                    <img src={Profile} alt="Profile"></img>
                </div>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
                    <h3>{name}<br/><span>Patient</span></h3>
                    <ul>
                        {/* Use Link component */}
                        <Link to="/admin"><PatientMenu img={User} text="My Profile" /></Link>
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

export default Dropdown;
