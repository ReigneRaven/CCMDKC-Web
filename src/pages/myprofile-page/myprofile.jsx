import React from 'react';
import './myprofile.css';
import Profile from '../../assets/profile.png';

export default function MyProfile() {
  return (
    <>
      <div className="patient-profile">
        <img src={Profile} />
        <div className="patient-details">
          <p className="ptn-name">Name</p>
          <p className="ptn-number">number</p>
          <p className="ptn-address">address</p>
        </div>
      </div>

      <div className="patient-info">
        <h1 id="details-h1">Patient Details</h1>
        <div className="patient-details-section">
          <div className="scrollable-container">
            <table className="patient-details-table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Birthdate</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Sex</td>
                  <td>-</td>
                </tr>
                {/* Add more attributes and values here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
