import React, { useEffect, useState } from "react";
import "./myprofile.css";
import PtnHeader from "../patient-page/components/header";
import PtnSidebar from "../patient-page/components/sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MyProfile() {
  const [user, setUser] = useState({
    name: "",
    contactNum: "",
    address: "",
    birthday: "",
    email: ""
  });
  
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/" + id)
      .then((result) => {
        setUser(result.data); 
      })
      .catch((err) => console.log(err));
  }, [id]);

  const formatBirthday = (birthday) => {
    const formattedDate = new Date(birthday);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return formattedDate.toLocaleDateString(undefined, options);
  }

  return (
    <>
      <div>
        <PtnHeader name={user.name}/>
        <div className="profile-container">
          <PtnSidebar id={id}/>

          <div className="patient-info">
            <h1 id="details-h1">Patient Details</h1>
            <div className="patient-details-section">
              <div className="profile-view">
                {user && (
                  <div className="myprofile-details">
                  <p><strong>Name:&nbsp;</strong> {user.name}</p>
                  <p><strong>Contact Number:&nbsp;</strong> {user.contactNum}</p>
                  <p><strong>Address:&nbsp;</strong> {user.address}</p>
                  <p><strong>Birthday:&nbsp;</strong> {formatBirthday(user.birthday)}</p>
                  <p><strong>Email:&nbsp;</strong> {user.email}</p>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
