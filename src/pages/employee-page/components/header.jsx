import React from "react";
import '../employee.css'
import DiaLogo from "../../../components/logo/logo";
import ClientLogo from '../../../assets/ccmdkc-logo.png'
import Head2 from "../../../components/headers/header";
import Kidney from '../../../assets/Nephrology_icon.png';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Logout from '../../../assets/logout.svg';
import axios from "axios";

export default function Header() {
    // const {id} = useParams()
    const [open, setOpen] = useState(false)
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        // Fetch the admin data here
        const adminId = localStorage.getItem("adminId");

        if (adminId) {
            axios
                .get(`http://localhost:5000/api/admin/${adminId}`)
                .then((response) => {
                    // Assuming your Admin model has a 'name' property
                    const adminData = response.data;
                    setAdminName(adminData.name);
                })
                .catch((error) => console.error(error));
        }
    }, []);

    return(
        <>
             <header>
                <div className="profile-header">
                    <div className="logo-sidebar">
                        <div id="logo-box-sidebar">
                        <DiaLogo src={ClientLogo}/>
                        <Head2 text="CCMDKC"/></div>
                    </div>
                    <div className="profile-menu">
                        <div className="menu-trigger"
                        onClick={()=>{setOpen(!open)}}>
                        <img src={Kidney} 
                        alt="Profile" 
                        id="menu-img"/>
                        {/* <h3 id="name-menu">Name</h3> */}
                        </div>

                        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}
                        id="drop-label">
                        <p>Hello, {adminName}!</p>

                            <div className="drop-links">
                            <ul>
                            <Link to='/'><Menu img={Logout}/>Logout</Link>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

function Menu(props) {
    return (
        <div className="dropdownItem">
            <img src={props.img}/>
        </div>
    );
}