import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdSpaceDashboard, MdMedicalServices, MdAnnouncement } from 'react-icons/md';
import { FaNotesMedical } from "react-icons/fa";
import { RiGitRepositoryFill } from "react-icons/ri";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Sidebar() {
    const [adminId, setAdminId] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);

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

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <div className={`sidenav ${showSidebar ? "" : "hidden"}`}>
                <ul>
                    <Link to={`/admin/${adminId}`} className="link-div"><MdSpaceDashboard className="sidebar-icon" />&nbsp;Dashboard</Link>
                    <Link to={`/admin/reports/${adminId}`} className="link-div"><RiGitRepositoryFill className="sidebar-icon" />&nbsp;Reports</Link>
                    <Link to={`/admin/patientrecord/${adminId}`} className="link-div"><FaNotesMedical className="sidebar-icon" />&nbsp;Records</Link>
                    <Link to={`/admin/supplies/${adminId}`} className="link-div"><MdMedicalServices className="sidebar-icon" />&nbsp;Supplies</Link>
                    <Link to={`/admin/announcements/${adminId}`} className="link-div" id="announce-link"><MdAnnouncement className="sidebar-icon" />&nbsp;Bulletin</Link>
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
