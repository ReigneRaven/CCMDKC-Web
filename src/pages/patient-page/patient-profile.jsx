import React from "react"
import '../patient-page/patient-profile.css'
import { Link } from "react-router-dom"
import DiaLogo from "../../components/logo/logo"
import ClientLogo from '../../assets/ccmdkc-logo.png'
import Head2 from '../../components/headers/header'
import {LuLayoutDashboard} from 'react-icons/lu'
import {MdMedicalServices, MdOutlineAnnouncement} from 'react-icons/md'
import Dashboard from "../../components/dashboard/dashboard"


export default function PtnProfile (){
    return(
        <>
        
         <div className="profile-side">
            <header>
            <div className="profile-header">
             <div className="logo-sidebar">
                <div id="logo-box-sidebar"><DiaLogo src={ClientLogo}/><Head2 text="CCMDKC"/></div>
            </div>
            <p>JSDJFNJSDNFJSDNFSJDFNJSDNFS</p>
            </div>
            </header>
          
            <div className="content-container">
            <div className="sidenav">
            <ul>
                <li>
                    <Link to="/patient" className="link-div"><LuLayoutDashboard/>&nbsp;Dashboard</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/services" className="link-div"><MdMedicalServices/>&nbsp;Services</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/announcements" className="link-div"><MdOutlineAnnouncement/>&nbsp;Announcements</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/Schedule">Schedule</Link>
                </li>
            </ul>
            </div>
       
            <main>
                <div id="main-upper-container">
                    <h1>Good day!</h1>
                </div>
                <Dashboard/>
            </main>

            <div id="profile-container">
                <h1>good good</h1>
            </div>
        </div>

    </div>
    
        </>
    )
}