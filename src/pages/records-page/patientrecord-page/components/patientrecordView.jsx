import React, { useEffect, useState } from "react";
import axios from "axios";
import MedicalRecordModal from "./medicalrecordModal";

export default function PatientRecordView() {
  const [data, setData] = useState([]);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/records")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient record data:", error);
      });
  }, []);

  const handleViewDetails = (patientId) => {
    setSelectedPatientId(patientId);
    setShowMedicalHistory(true);
  };

  return (
    <div className="patientrecord-table-content">
      <div className="record-table-container">
        <table className="table">
          <thead id="header-patientrecord">
            <tr>
              <th>Patient Name</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Age</th>
              <th>Sex</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record._id}>
                <td>{record.patientName}</td>
                <td>{record.weight}</td>
                <td>{record.height}</td>
                <td>{record.age}</td>
                <td>{record.sex}</td>
                <td>
                  <button
                    className="view-details"
                    onClick={() => handleViewDetails(record._id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showMedicalHistory && (
        <div className="overlay">
          <div className="medicalrecord-modal-container">
            <MedicalRecordModal
              patientId={selectedPatientId}
              onClose={() => setShowMedicalHistory(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
