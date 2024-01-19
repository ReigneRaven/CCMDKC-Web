import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillFileMedicalFill } from "react-icons/bs";
import { MdSpaceDashboard, MdMedicalServices, MdAnnouncement } from "react-icons/md";
import { FaHouseMedical } from "react-icons/fa6";
import axios from "axios";

export default function PtnSidebar() {
  const [userId, setUserId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    if (storedUserId) {
      axios
        .get(`http://localhost:5000/api/user/${storedUserId}`)
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
          <Link to={`/patient/${userId}`} className="link-div">
            <MdSpaceDashboard className="sidebar-icon" />&nbsp;Dashboard
          </Link>

          <Link to={`/appointment/${userId}`} className="link-div">
            <MdMedicalServices className="sidebar-icon" />&nbsp;Appointments
          </Link>

          <Link to={`/healthrecord/${userId}`} className="link-div" id="history-link">
            <BsFillFileMedicalFill className="sidebar-icon"/>&nbsp;Health History
          </Link>
          <Link to={`/pharmacy/${userId}`} className="link-div" id="pharmacy-link">
            <FaHouseMedical className="sidebar-icon"/>&nbsp;Pharmacy
          </Link>
          <Link to={`/announcements/${userId}`} className="link-div" id="announce-link">
            <MdAnnouncement className="sidebar-icon"/>&nbsp;Bulletin
          </Link>
        </ul>
      </div>
      <div className="hamburger-button" onClick={toggleSidebar}>
        <strong>
        ☰
        </strong>
      </div>
    </>
  );
}
