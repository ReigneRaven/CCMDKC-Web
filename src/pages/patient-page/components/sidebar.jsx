import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillFileMedicalFill } from "react-icons/bs";
import { MdSpaceDashboard, MdMedicalServices, MdAnnouncement } from "react-icons/md";
import axios from "axios";

export default function PtnSidebar() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve userId from local storage
    const storedUserId = localStorage.getItem("userId");

    // Update the state with the retrieved userId
    setUserId(storedUserId);

    // Fetch user data based on the provided userId
    if (storedUserId) {
      axios
        .get(`http://localhost:5000/api/user/${storedUserId}`)
        .then((response) => {
          // Handle the response data if needed
          console.log(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <>
      <div className="sidenav">
        <ul>
          <Link to={`/patient/${userId}`} className="link-div">
            <MdSpaceDashboard className="sidebar-icon" />&nbsp;Dashboard
          </Link>

          <Link to={`/appointment/${userId}`} className="link-div">
            <MdMedicalServices className="sidebar-icon" />&nbsp;Appointments
          </Link>

          <Link to="/" className="link-div" id="history-link">
            <BsFillFileMedicalFill className="sidebar-icon"/>&nbsp;Health History
          </Link>

          <Link to={`/announcements/${userId}`} className="link-div" id="announce-link">
            <MdAnnouncement className="sidebar-icon"/>&nbsp;Bulletin
          </Link>
        </ul>
      </div>
    </>
  );
}
