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
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
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
              <div className="scrollable-container">
                {user && (
                  <table className="patient-details-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Birthday</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="table-cell">{user.name}</td>
                        <td className="table-cell">{user.contactNum}</td>
                        <td className="table-cell">{user.address}</td>
                        <td className="table-cell">{formatBirthday(user.birthday)}</td>
                        <td className="table-cell">{user.email}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
