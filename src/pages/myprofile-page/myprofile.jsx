import React, { useEffect, useState } from "react";
import "./myprofile.css";
import PtnHeader from "../patient-page/components/header";
import PtnSidebar from "../patient-page/components/sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MyProfile() {
  const [user, setUser] = useState({
    _id: "",
    UserName:"",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    contactNum: "",
    houseNum: "",
    street: "",
    brgy: "",
    city: "",
    prov: "",
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
        <PtnHeader/>
        <div className="profile-container">
          <PtnSidebar/>

          <div className="patient-info">
            <h1 id="details-h1">Patient Details</h1>

            <div className="patient-details-section">
              <div className="profile-view">
                {user && !isEditing && (
                  <div className="myprofile-details">
                    <p><strong>Name:&nbsp;&nbsp;&nbsp;</strong> 
                    {user.FirstName}&nbsp;
                    {user.MiddleName}&nbsp;
                    {user.LastName}&nbsp;
                    </p>
                    <p><strong>Contact Number:&nbsp;&nbsp;&nbsp;</strong> {user.contactNum}</p>
                    <p><strong>Address:&nbsp;&nbsp;&nbsp;</strong> 
                      {user.houseNum} &nbsp;
                      {user.street}  &nbsp;
                      {user.brgy} &nbsp;
                      {user.city} &nbsp;
                      {user.prov}
                    </p>
                    <p><strong>Birthday:&nbsp;&nbsp;&nbsp;</strong> {formatBirthday(user.birthday)}</p>
                    <p><strong>Email:&nbsp;&nbsp;&nbsp;</strong> {user.email}</p>
                    <button id="edit-btn" onClick={handleEditClick}>Edit</button>
                  </div>
                )}
                
                {/*----------------------------------- EDIT PROCESS ---------------------------------------- */}
                
                {user && isEditing && (
                  <div className="edit-myprofile-details">
                    
                    <div className="edit-name-input">
                    <input
                    id="edit-first"
                    type="text"
                    name="FirstName"
                    value={user.FirstName}
                    placeholder="First Name"
                    onChange={handleChange}
                    />

                    <input
                    id="edit-mid"
                    type="text"
                    name="MiddleName"
                    value={user.MiddleName}
                    placeholder="Middle Name"
                    onChange={handleChange}
                    />

                    <input
                    id="edit-last"
                    type="text"
                    name="LastName"
                    value={user.LastName}
                    placeholder="Last Name"
                    onChange={handleChange}
                    />
                    </div>

                  <div className="edit-numbirth-input">
                    <input
                    id="edit-num"
                      type="text"
                      name="contactNum"
                      value={user.contactNum}
                      placeholder="Contact No."
                      onChange={handleChange}
                    />
                    <input
                    id="edit-birth"
                      type="text"
                      name="birthday"
                      value={user.birthday}
                      placeholder="YY-MM-DD"
                      onChange={handleChange}
                    />
                    </div>

                    {/* ADDRESS INPUT FIELDS */}
                    <div className="edit-address-input">
                    <input
                    id="edit-house"
                      type="text"
                      name="houseNum"
                      value= {user.houseNum} 
                      placeholder="House No."
                      onChange={handleChange}
                    />
                    <input
                    id="edit-street"
                      type="text"
                      name="street"
                      value= {user.street} 
                      placeholder="Street"
                      onChange={handleChange}
                    />
                    <input
                    id="edit-brgy"
                      type="text"
                      name="brgy"
                      value= {user.brgy} 
                      placeholder="Barangay"
                      onChange={handleChange}
                    />
                    <input
                    id="edit-city"
                      type="text"
                      name="city"
                      value= {user.city} 
                      placeholder="City/Municipality"
                      onChange={handleChange}
                    />
                    <input
                    id="edit-prov"
                      type="text"
                      name="prov"
                      value= {user.prov} 
                      placeholder="Province"
                      onChange={handleChange}
                    />
                    </div>
                     {/* END OF ADDRESS INPUT FIELDS */}

                    <div className="edit-handler-input">
                    <input
                    id="edit-email"
                      type="text"
                      name="email"
                      value={user.email}
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    <input
                    id="edit-userName"
                      type="text"
                      name="userName"
                      value={user.UserName}
                      placeholder="Username"
                      onChange={handleChange}
                    />
                    </div>
                  <div className="edit-savecancel">
                    <button id="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                    <button id="save-btn" onClick={handleSaveClick}>Save</button>
                  </div>
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
