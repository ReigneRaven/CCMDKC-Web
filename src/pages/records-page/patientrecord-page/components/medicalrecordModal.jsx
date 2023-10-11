import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MedicalRecordModal({ patientId, onClose }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .put(`http://localhost:5000/api/user/${patientId}/medical-history`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medical record data:", error);
      });
  }, [patientId]);

  return (
    <div className="medicalrecord-table-content">
      <div className="medical-table-container">
        <table className="table">
          <thead id="header-medicalrecord">
            <tr>
              <th>Allergies</th>
              <th>Diagnosis</th>
              <th>Blood Pressure</th>
              <th>Temperature</th>
              <th>Surgeries</th>
            </tr>
          </thead>
          <tbody>
            {data.map((history) => (
              <tr key={history._id}>
                <td>{history.allergies}</td>
                <td>{history.diagnosis}</td>
                <td>{history.bloodPressure}</td>
                <td>{history.temperature}</td>
                <td>{history.surgeries}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
