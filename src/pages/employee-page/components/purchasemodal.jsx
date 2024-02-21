import React, { useEffect, useState } from "react";
import axios from 'axios'
import Cookies from "js-cookie";

export default function PurchaseModal({ onClose, purchase }) {

  const [userDetails, setUserDetails] = useState(null);
  const userId = Cookies.get('userId')
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (purchase) {
      fetchUserDetails();
    }
  }, [purchase]);


  return (
    <div className="purchasemodal-table-content">
      <div className="purchasemodal-table-container">
        <table className="purchasemodal-table">
          <thead id="header-purchasemodal">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userDetails && (
              <tr>
              <td>{userDetails.FirstName} {userDetails.LastName}</td>
              <td>{userDetails.houseNum} {userDetails.street} {userDetails.brgy} {userDetails.city} {userDetails.prov}</td>
              <td>{userDetails.contactNum}</td>
              <td>{userDetails.email}</td>
            </tr>
            )}
          </tbody>
        </table>
        <button onClick={onClose} id="close-purchase-modal">Close</button>
      </div>
    </div>
  );
}