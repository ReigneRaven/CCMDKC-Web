import React, { useEffect, useState } from "react";

export default function PurchaseModal({ onClose }) {

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
          {/* {filteredName.map((purchase) => (
                <tr key={purchase._id}>
                  <td>{purchase.name}</td>
                  <td>{purchase.address}</td>
                  <td>{purchase.phoneNumber}</td>
                  <td>{purchase.email}</td>
                </tr>
              ))} */}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
