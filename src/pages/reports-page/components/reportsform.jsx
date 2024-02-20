import React, { useState } from "react";
import axios from "axios";
import ReportsView from "./reportsview"; // Import the ReportsView component

export default function ReportsForm() {
  const [firstParams, setFirstParams] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiUrl = "";
      let params = {
        text: {
          query: firstParams,
          path: {
            wildcard: '*',
          },
        },
      };

      // Check if firstParams is a valid number and add it to params if present
      const numericValue = parseFloat(firstParams);
      if (!isNaN(numericValue)) {
        params.text.numericQuery = numericValue;
      }

      setSearchedQuery(firstParams);

      switch (selectedType) {
        case "Appointments":
          apiUrl = "http://localhost:5000/api/appointments/search";
          break;
        case "Records":
          apiUrl = "http://localhost:5000/api/records/search";
          break;
        case "Inventory":
          apiUrl = "http://localhost:5000/api/inventory/search";
          break;
        default:
          console.error("Invalid type selected");
          return;
      }

      const response = await axios.post(apiUrl, params);
      const responseData = response.data;
      console.log("Data:", responseData);

      // Set the fetched data to the state
      setTableData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <form className="reports-form-container" onSubmit={onSubmit}>
        <select
          id="reports-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="" disabled>
            Service Params
          </option>
          <option value="Appointments">Appointments</option>
          <option value="Records">Records</option>
          <option value="Inventory">Inventory</option>
        </select>

        <input
          className="reports-input"
          type="text"
          value={firstParams}
          onChange={(e) => setFirstParams(e.target.value)}
          placeholder="Query"
        />

        <button id="reports-form-btn">Generate</button>
      </form>

      {/* Render the ReportsView component with the fetched data */}
      <ReportsView tableData={tableData} selectedType={selectedType} searchedQuery={searchedQuery} />
    </>
  );
}