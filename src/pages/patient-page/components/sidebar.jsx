import React from "react";
import { Link } from "react-router-dom";
import {LuLayoutDashboard} from 'react-icons/lu'
import {MdMedicalServices, MdOutlineAnnouncement} from 'react-icons/md'


export default function PtnSidebar(){
    return(
        <>
                <div className="sidenav">
                    <ul>
                    <Link to="/patient" className="link-div"><LuLayoutDashboard/>&nbsp;Dashboard</Link>

                    <Link to="/services" className="link-div"><MdMedicalServices/>&nbsp;Services</Link>
    
                    <Link to="/patient/announcements" className="link-div" id="announce-link"><MdOutlineAnnouncement/>&nbsp;Announcements</Link>
                        
                    </ul>
                </div>
        </>
    )
}