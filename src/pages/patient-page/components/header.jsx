import React, { useState } from "react";
import '../patient-profile.css'
import DiaLogo from "../../../components/logo/logo";
import ClientLogo from '../../../assets/ccmdkc-logo.png'
import Head2 from "../../../components/headers/header";
import Profile from '../../../assets/profile.png'
import { Link } from "react-router-dom";
import User from '../../../assets/user.svg'
import Password from '../../../assets/changepassword.svg'
import Logout from '../../../assets/logout.svg'


export default function PtnHeader() {
    
    const [open, setOpen] = useState(false)


    return(
        <>
             <header className="ptnheader">
                <div className="profile-header-ptn">
                    <div className="logo-sidebar-ptn">
                        <div id="logo-box-sidebar-ptn">
                        <DiaLogo src={ClientLogo}/>
                        <Head2 text="CCMDKC"/>
                        </div>
                    </div>

                    <div className="profile-menu-ptn">
                        <div className="menu-trigger-ptn"
                        onClick={()=>{setOpen(!open)}}>
                        <img src={Profile} 
                        alt="Profile" 
                        id="menu-img-ptn"/>
                        {/* <h3 id="name-menu">Name</h3> */}
                        </div>

                        <div className={`dropdown-menu-ptn ${open ? 'active' : 'inactive'}`}
                        id="drop-label-ptn">
                        <p>name</p>
                        <p>Patient</p>

                            <div className="drop-links-ptn">
                            <ul>
                            <Link to='/patient/myprofile'><PatientMenu img={User}/>My Profile</Link>
                            <Link to='/patient/changepassowrd'><PatientMenu img={Password}/>Change Password</Link>
                            <Link to='/'><PatientMenu img={Logout}/>Logout</Link>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

function PatientMenu(props) {
    return (
        <div className="dropdownItem">
            <img src={props.img}/>
        </div>
    );
}