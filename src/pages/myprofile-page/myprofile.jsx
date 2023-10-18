import React, { useEffect, useState } from "react";
import "./myprofile.css";
import PtnHeader from "../patient-page/components/header";
import PtnSidebar from "../patient-page/components/sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MyProfile() {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    contactNum: "",
    address: "",
    birthday: "",
    email: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [originalUser, setOriginalUser] = useState({}); // Store the original user data

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/" + id)
      .then((result) => {
        setUser(result.data);
        setOriginalUser(result.data); // Store the original user data
      })
      .catch((err) => console.log(err));
  }, [id]);

  const formatBirthday = (birthday) => {
    const formattedDate = new Date(birthday);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return formattedDate.toLocaleDateString(undefined, options);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleSaveClick = () => {
    // Create a copy of the user object with the updated values
    const updatedUser = { ...user };

    // Send a PUT request to update the user's profile
    axios
      .put("http://localhost:5000/api/user/" + user._id, updatedUser)
      .then((result) => {
        // Handle success or error here
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        // Handle the error here
      });
  }

  const handleCancelClick = () => {
    setIsEditing(false);
    // Restore the user data to its original state
    setUser(originalUser);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  return (
    <>
      <div>
        <PtnHeader name={user.name} />
        <div className="profile-container">
          <PtnSidebar id={id} />

          <div className="patient-info">
            <h1 id="details-h1">Patient Details</h1>
            <div className="patient-details-section">
              <div className="profile-view">
                {user && !isEditing && (
                  <div className="myprofile-details">
                    <p><strong>Name:&nbsp;</strong> {user.name}</p>
                    <p><strong>Contact Number:&nbsp;</strong> {user.contactNum}</p>
                    <p><strong>Address:&nbsp;</strong> {user.address}</p>
                    <p><strong>Birthday:&nbsp;</strong> {formatBirthday(user.birthday)}</p>
                    <p><strong>Email:&nbsp;</strong> {user.email}</p>
                    <button id="edit-btn" onClick={handleEditClick}>Edit</button>
                  </div>
                )}
                {user && isEditing && (
                  <div className="myprofile-details">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="contactNum"
                      value={user.contactNum}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="birthday"
                      value={user.birthday}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                    <button id="save-btn" onClick={handleSaveClick}>Save</button>
                    <button id="cancel-btn" onClick={handleCancelClick}>Cancel</button>
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
