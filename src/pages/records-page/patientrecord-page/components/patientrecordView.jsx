import React, { useEffect, useState } from "react";
import axios from "axios";
import MedicalRecordModal from "./medicalrecordModal";
import { useParams } from "react-router-dom";

export default function PatientRecordView() {
  const [data, setData] = useState([]);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);

  const { medicalId } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/records")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient record data:", error);
      });
  }, [editingRecord]);

  const handleViewDetails = (medicalId) => {
    setSelectedPatientId(medicalId);
    setShowMedicalHistory(true);

    axios
      .get(`http://localhost:5000/api/records/get-medical-history/${medicalId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medical record", error);
      });
  };

  const filteredData = data.filter((record) =>
    record.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (record) => {
    setEditingRecord(record);
  };

  const handleSaveClick = () => {
    const { _id, ...updatedData } = editingRecord;
    axios
      .put(`http://localhost:5000/api/records/${_id}`, updatedData)
      .then((result) => {
        setData((prevData) => {
          const updatedData = prevData.map((record) =>
            record._id === _id ? editingRecord : record
          );
          return updatedData;
        });
        setEditingRecord(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancelClick = () => {
    setEditingRecord(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingRecord((prevEditingRecord) => ({
      ...prevEditingRecord,
      [name]: value,
    }));
  };

  return (
    <div className="searchbar-record-adm">
      <input
        id="searchbar-record"
        type="text"
        placeholder=" Search Patient by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="patientrecord-table-content">
        <div className="record-table-container">
          <table className="table-adm">
            <thead id="header-patientrecord">
              <tr>
                <th>Record ID</th>
                <th>Patient Name</th>
                <th>Weight</th>
                <th>Height</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Edit</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record._id}>
                  <td>{record._id.toString()}</td>
                  <td>
                    {editingRecord && editingRecord._id === record._id ? (
                      <input
                        type="text"
                        name="patientName"
                        className="record-change"
                        value={editingRecord.patientName}
                        onChange={(e) => handleEditChange(e, record)}
                      />
                    ) : (
                      record.patientName
                    )}
                  </td>
                  <td>
                    {editingRecord && editingRecord._id === record._id ? (
                      <input
                        type="text"
                        name="weight"
                        className="record-change"
                        value={editingRecord.weight}
                        onChange={(e) => handleEditChange(e, record)}
                      />
                    ) : (
                      record.weight
                    )}
                  </td>
                  <td>
                    {editingRecord && editingRecord._id === record._id ? (
                      <input
                        type="text"
                        name="height"
                        className="record-change"
                        value={editingRecord.height}
                        onChange={(e) => handleEditChange(e, record)}
                      />
                    ) : (
                      record.height
                    )}
                  </td>
                  <td>
                    {editingRecord && editingRecord._id === record._id ? (
                      <input
                        type="text"
                        name="age"
                        className="record-change"
                        value={editingRecord.age}
                        onChange={(e) => handleEditChange(e, record)}
                      />
                    ) : (
                      record.age
                    )}
                  </td>
                  <td>
                    {editingRecord && editingRecord._id === record._id ? (
                      <input
                        type="text"
                        name="sex"
                        className="record-change"
                        value={editingRecord.sex}
                        onChange={(e) => handleEditChange(e, record)}
                      />
                    ) : (
                      record.sex
                    )}
                  </td>
                  <td>
                    {!editingRecord || editingRecord._id !== record._id ? (
                      <button
                        className="editButton"
                        onClick={() => handleEditClick(record)}
                      >
                        Edit
                      </button>
                    ) : null}
                    {editingRecord && editingRecord._id === record._id ? (
                      <>
                        <div className="actionButtons">
                          <button
                            className="savebtn-record"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                        </div>
                        <div className="actionButtons">
                          <button
                            className="cancelbtn-record"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : null}
                  </td>
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
    </div>
  );
}
