import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportsView from "./reportsview";

export default function ReportsForm() {
  // State variables for form data and fetched table data
  const [firstParams, setFirstParams] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);

  // useEffect to clear input field and tableData when selectedType changes
  useEffect(() => {
    setFirstParams("");
    setTableData([]);
    setGenerateButtonClicked(false); // Set generateButtonClicked to false when selectedType changes
  }, [selectedType]);

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if firstParams is empty, and return early if true
    if (!firstParams.trim()) {
      console.log("Input field is empty. Please enter a query.");
      return;
    }

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

      // Determine the API endpoint based on the selectedType
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
        case "Users":
          apiUrl = "http://localhost:5000/api/user/search";
          break;
        case "Orders":
          apiUrl = "http://localhost:5000/api/purchase/search";
          break;
        default:
          console.error("Invalid type selected");
          return;
      }

      // Fetch data from the API
      const response = await axios.post(apiUrl, params);
      const responseData = response.data;

      // Set the fetched data to the state
      setTableData(responseData);
      setGenerateButtonClicked(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {/* Form for selecting report type and entering query parameters */}
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
          <option value="Users">Users</option>
          <option value="Orders">Orders</option>
        </select>

        <input
          id="reports-inputfield"
          className="reports-input"
          type="text"
          value={firstParams}
          onChange={(e) => setFirstParams(e.target.value)}
          placeholder="Query"
        />

        <button id="reports-form-btn">Generate</button>
      </form>

      {/* Display the ReportsView component with the fetched data */}
      <ReportsView
        tableData={tableData}
        selectedType={selectedType}
        searchedQuery={searchedQuery}
        generateButtonClicked={generateButtonClicked}
      />
    </>
  );
}
