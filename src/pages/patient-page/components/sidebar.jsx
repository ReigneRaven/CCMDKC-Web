import React from "react";
import { Link } from "react-router-dom";
import { BsFillFileMedicalFill } from "react-icons/bs";
import {MdSpaceDashboard, MdMedicalServices, MdAnnouncement, } from 'react-icons/md'


export default function PtnSidebar(){
    return(
        <>
                <div className="sidenav">
                    <ul>
                    <Link to="/patient" className="link-div"><MdSpaceDashboard/>&nbsp;Dashboard</Link>

                    <Link to="/services" className="link-div"><MdMedicalServices/>&nbsp;Services</Link>

                    <Link to="/" className="link-div"><BsFillFileMedicalFill/>&nbsp;Medical History</Link>
    
                    <Link to="/patient/announcements" className="link-div" id="announce-link"><MdAnnouncement/>&nbsp;Announcements</Link>
                        
                    </ul>
                </div>
        </>
    )
}