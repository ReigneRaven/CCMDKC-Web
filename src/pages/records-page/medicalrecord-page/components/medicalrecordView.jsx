import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MedicalRecordView() {
  const [data, setData] = useState([]);
  
  {/*useEffect(() => {
    axios
      .get("http://localhost:5000/api/records")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medical record data:", error);
      });
  }, []);*/}  {/*Mali pa routing nito */}

  return (
    <div className="medicalrecord-table-content">
      <div className="table-container"> {/* Added a container div */}
        <table className="table">
          <thead id="header-medicalrecord">
            <tr>
              <th>Allergies</th>
              <th>Diagnosis</th>
              <th>Blood-Pressure</th>
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
      </div>
    </div>
  );
}
