import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdSpaceDashboard, MdMedicalServices, MdAnnouncement } from 'react-icons/md';
import { FaNotesMedical } from "react-icons/fa";
import { RiGitRepositoryFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5"; // Importing IoHome icon
import axios from "axios";
import Cookies from 'js-cookie';

export default function Sidebar() {
    const [adminId, setAdminId] = useState(null);
    const [showSidebar, setShowSidebar] = useState(() => {
        const storedSidebarState = localStorage.getItem("showSidebar");
        return storedSidebarState !== null ? JSON.parse(storedSidebarState) : true;
    });

    const location = useLocation();

    useEffect(() => {
        const storedAdminId = Cookies.get('adminId');
        setAdminId(storedAdminId);

        if (storedAdminId) {
            axios
                .get(`http://localhost:5000/api/admin/${storedAdminId}`)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => console.error(error));
        }
    }, []);

    const hideSidebar = () => {
        setShowSidebar(false);
        localStorage.setItem("showSidebar", JSON.stringify(false));
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
        localStorage.setItem("showSidebar", JSON.stringify(!showSidebar));
    };

    return (
        <>
            <div className={`sidenav ${showSidebar ? "" : "hidden"}`}>
                <ul>
                    <Link to={`/admin/${adminId}`} className="link-div" onClick={hideSidebar}><MdSpaceDashboard className="sidebar-icon" />&nbsp;Dashboard</Link>
                    <Link to={`/admin/reports/${adminId}`} className="link-div" onClick={hideSidebar}><RiGitRepositoryFill className="sidebar-icon" />&nbsp;Reports</Link>
                    <Link to={`/admin/patientrecord/${adminId}`} className="link-div" onClick={hideSidebar}><FaNotesMedical className="sidebar-icon" />&nbsp;Records</Link>
                    <Link to={`/admin/supplies/${adminId}`} className="link-div" onClick={hideSidebar}><MdMedicalServices className="sidebar-icon" />&nbsp;Supplies</Link>
                    <Link to={`/admin/announcements/${adminId}`} className="link-div" id="announce-link" onClick={hideSidebar}><MdAnnouncement className="sidebar-icon" />&nbsp;Bulletin</Link>
                </ul>
            </div>
            <div className="hamburger-button" onClick={toggleSidebar}>
                <strong>
                    <IoHome /> {/* Replacing hamburger icon ☰ with IoHome */}
                </strong>
            </div>
        </>
    );
}
