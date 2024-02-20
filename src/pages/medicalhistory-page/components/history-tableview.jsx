import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HistoryModalPtn from "./history-tablemodal";
import Cookies from "js-cookie";

export default function HistoryTablePtn() {
  const [data, setData] = useState([]);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");
  const { medicalId } = useParams();
  const [userId, setUserId] = useState(null);
  const [UserName, setUserName] = useState("")


  const filteredName = data.filter((record) => {
    return record.patientName === UserName;
  });

  console.log('filteredName', filteredName)
  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId);

    if (storedUserId) {
      axios
        .get(`http://localhost:5000/api/user/${storedUserId}`)
        .then((response) => {
          console.log('User Details', response.data);
          setUserName(response.data.UserName)
        })
        .catch((error) => console.error(error));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/records")
      .then((response) => {
        setData(response.data);
        console.log('Fetched Medical Records:', response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient record data:", error);
      });
  }, []);

  const handleViewDetails = (medicalId) => {
    setSelectedPatientId(medicalId);
    setShowMedicalHistory(true);

    console.log(selectedPatientId);

    axios
      .get(`http://localhost:5000/api/records/get-medical-history/${medicalId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medical record", error);
      });
  };

//   const fullName = `${response.data.FirstName} ${response.data.MiddleName} ${response.data.LastName}`;
// setUserName(fullName);


  return (
    <>
      <div className="table-history-content">
        <div className="table-history-container">
          <table className="table-ptn">
            <thead id="header-patientrecord">
              {/* <input
                id="searchbar-record"
                type="text"
                placeholder="Search Patient Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              /> */}
              <tr>
                <th>Patient Name</th>
                <th>Weight</th>
                <th>Height</th>
                <th>Age</th>
                <th>Sex</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody id="tbodyptn">
              {filteredName.map((record) => (
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
      </div>
      {showMedicalHistory && (
        <div className="overlay">
          <div className="medicalrecord-modal-container">
            <HistoryModalPtn
              patientId={selectedPatientId}
              onClose={() => setShowMedicalHistory(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
