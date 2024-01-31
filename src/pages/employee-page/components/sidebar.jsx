import React from "react";
import { Link } from "react-router-dom";
import {MdSpaceDashboard, MdMedicalServices, MdAnnouncement} from 'react-icons/md'
import { FaNotesMedical } from "react-icons/fa";
import { RiGitRepositoryFill } from "react-icons/ri";
import {useState} from "react";

export default function Sidebar(){

    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
      };


    return(
        <>
                <div className={`sidenav ${showSidebar ? "" : "hidden"}`}>
                    <ul>
                    <Link to="/admin" className="link-div"><MdSpaceDashboard className="sidebar-icon"/>&nbsp;Dashboard</Link>

                    <Link to="/admin/reports" className="link-div"><RiGitRepositoryFill className="sidebar-icon" />&nbsp;Reports</Link>

                    <Link to="/admin/patientrecord" className="link-div"><FaNotesMedical className="sidebar-icon" />&nbsp;Records</Link>

                    <Link to="/admin/supplies" className="link-div"><MdMedicalServices className="sidebar-icon"/>&nbsp;Supplies</Link>
    
                    <Link to="/admin/announcements" className="link-div" id="announce-link"><MdAnnouncement className="sidebar-icon" />&nbsp;Bulletin</Link>
                        
                    </ul>
                </div>
                <div className="hamburger-button" onClick={toggleSidebar}>
        <strong>
        ☰
        </strong>
      </div>
        </>
    )
}