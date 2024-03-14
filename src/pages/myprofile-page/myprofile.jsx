import React, { useEffect, useState } from "react";
import "./myprofile.css";
import PtnHeader from "../patient-page/components/header";
import PtnSidebar from "../patient-page/components/sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export default function MyProfile() {
  const [user, setUser] = useState({
    _id: "",
    UserName: "",
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
    if (!birthday) return "";
    const formattedDate = new Date(birthday);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return formattedDate.toLocaleDateString(undefined, options);
  }

  const handleEditClick = () => {
    setIsEditing(true);

    // Format the birthday to "MM/DD/YYYY" if it's not already in that format
    const formattedBirthday = user.birthday ? formatBirthday(user.birthday) : "";

    setUser({
      ...user,
      birthday: formattedBirthday,
    });
  }

  const handleSaveClick = () => {
    // Send a PUT request to update the user's profile
    axios
      .put("http://localhost:5000/api/user/" + user._id, user)
      .then((result) => {
        // Update the originalUser state to reflect the changes
        setOriginalUser(user);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        // Handle the error here
      });
  }

  const handleCancelClick = () => {
    setIsEditing(false);
    // Revert the user data back to its original state
    setUser(originalUser);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // If changing the birthday field, ensure it's in the "MM/DD/YYYY" format
    if (name === 'birthday') {
      // You can add your custom validation logic here
      // For simplicity, let's assume a basic check for "MM/DD/YYYY" format
      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
        // If the format is incorrect, you can handle it accordingly
        console.log('Invalid date format');
        updatedValue = ''; // or any default value you prefer
      }
    }

    setUser({
      ...user,
      [name]: updatedValue,
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
                    <p><strong><HiOutlineIdentification id="name-icon"/>&nbsp;&nbsp;&nbsp;</strong>
                      {user.FirstName}&nbsp;
                      {user.MiddleName}&nbsp;
                      {user.LastName}&nbsp;
                    </p>
                    <p><strong><FiPhoneCall id="phone-icon"/>&nbsp;&nbsp;&nbsp;</strong> {user.contactNum}</p>
                    <p><strong><AiOutlineHome id="home-icon"/>&nbsp;&nbsp;&nbsp;</strong>
                      {user.houseNum} &nbsp;
                      {user.street}  &nbsp;
                      {user.brgy} &nbsp;
                      {user.city} &nbsp;
                      {user.prov}
                    </p>
                    <p><strong><LiaBirthdayCakeSolid id="cake-icon" />&nbsp;&nbsp;&nbsp;</strong> {formatBirthday(user.birthday)}</p>
                    <p><strong><MdOutlineMailOutline id="email-icon"/>&nbsp;&nbsp;&nbsp;</strong> {user.email}</p>
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
                        placeholder="MM/DD/YYYY"
                        onChange={handleChange}
                      />
                    </div>

                    {/* ADDRESS INPUT FIELDS */}
                    <div className="edit-address-input">
                      <input
                        id="edit-house"
                        type="text"
                        name="houseNum"
                        value={user.houseNum}
                        placeholder="House No."
                        onChange={handleChange}
                      />
                      <input
                        id="edit-street"
                        type="text"
                        name="street"
                        value={user.street}
                        placeholder="Street"
                        onChange={handleChange}
                      />
                      <input
                        id="edit-brgy"
                        type="text"
                        name="brgy"
                        value={user.brgy}
                        placeholder="Barangay"
                        onChange={handleChange}
                      />
                      <input
                        id="edit-city"
                        type="text"
                        name="city"
                        value={user.city}
                        placeholder="City/Municipality"
                        onChange={handleChange}
                      />
                      <input
                        id="edit-prov"
                        type="text"
                        name="prov"
                        value={user.prov}
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
                      <button id="cancel-btn-myprofile" onClick={handleCancelClick}>Cancel</button>
                      <button id="save-btn-myprofile" onClick={handleSaveClick}>Save</button>
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
