import React, { useEffect, useState } from "react";
import axios from "axios";
import MedicalRecordModal from "./medicalrecordModal";
import { useParams } from "react-router-dom";


export default function PatientRecordView() {
  const [data, setData] = useState([]);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {medicalId} = useParams();

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

  const handleViewDetails = (medicalId) => {
    setSelectedPatientId(medicalId);
    setShowMedicalHistory(true);

    console.log(selectedPatientId)

    axios.get(`http://localhost:5000/api/records/get-medical-history/${medicalId}`)
    .then((response) => {
      console.log(response.data);
      //setData(response.data);
    }).catch((error) => {
      console.error("Error fetching medical record", error);
    },[]);


  };

  const filteredData = data.filter((record) => 
  record.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="patientrecord-table-content">
      <div className="record-table-container">
      <input 
            id="searchbar-record"
            type="text"
            placeholder="Search Patient Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
        <table className="table">
          <thead id="header-patientrecord">
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Age</th>
              <th>Sex</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record) => (
              <tr key={record._id}>
                <td>{record._id.toString()}</td> {/* Convert ObjectId to string */}
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
