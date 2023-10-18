import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MedicalRecordModal({ patientId, onClose }) {
  const [data, setData] = useState([]);
  const id = patientId

  console.log('id', id)

  useEffect(() => {
    axios
  .get('http://localhost:5000/api/records/get-medical-history/' + id)
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medical record data:", error);
      });
  }, []);

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
