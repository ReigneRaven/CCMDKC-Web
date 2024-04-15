import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MedicalRecordModal({ patientId, onClose }) {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const id = patientId;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/records/get-medical-history/" + id)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medical record data:", error);
      });
  }, [id]);

  const handleEditClick = (record) => {
    setIsEditing(true);
    setEditingRecord(record);
  };

  const handleSaveClick = () => {
    const { _id, ...updatedData } = editingRecord;
    axios
      .put(`http://localhost:5000/api/records/medical-history/${_id}`, updatedData)
      .then((result) => {
        setData((prevData) => {
          const updatedData = prevData.map((record) =>
            record._id === _id ? { ...record, ...editingRecord } : record
          );
          return updatedData;
        });
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingRecord((prevEditingRecord) => ({
      ...prevEditingRecord,
      [name]: value,
    }));
  };

  return (
    <div className="medicalrecord-table-content">
      <div className="medical-table-container">
        <table className="modal-table">
          <thead id="header-medicalrecord">
            <tr>
              <th>Allergies</th>
              <th>Diagnosis</th>
              <th>Blood Pressure</th>
              <th>Temperature</th>
              <th>Surgeries</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((history) => (
              <tr key={history._id}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="allergies"
                      className="modal-change"
                      value={editingRecord.allergies}
                      onChange={handleInputChange}
                    />
                  ) : (
                    history.allergies
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="diagnosis"
                      className="modal-change"
                      value={editingRecord.diagnosis}
                      onChange={handleInputChange}
                    />
                  ) : (
                    history.diagnosis
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bloodPressure"
                      className="modal-change"
                      value={editingRecord.bloodPressure}
                      onChange={handleInputChange}
                    />
                  ) : (
                    history.bloodPressure
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="temperature"
                      className="modal-change"
                      value={editingRecord.temperature}
                      onChange={handleInputChange}
                    />
                  ) : (
                    history.temperature
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="surgeries"
                      className="modal-change"
                      value={editingRecord.surgeries}
                      onChange={handleInputChange}
                    />
                  ) : (
                    history.surgeries
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <>
                      <button className="savebtn-modal" onClick={handleSaveClick}>
                        Save
                      </button>
                      <button className="cancelbtn-modal" onClick={handleCancelClick}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="editbtn-modal" onClick={() => handleEditClick(history)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}