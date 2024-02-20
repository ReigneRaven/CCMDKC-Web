import React from "react";

export default function ReportsView({ tableData, selectedType, searchedQuery }) {
  // Function to format date to MM/DD/YYYY
  const formatExpireDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const highlightText = (text) => {
    if (!searchedQuery || !text) return text;

    // Case-insensitive highlighting
    const regex = new RegExp(`(${searchedQuery})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      index % 2 === 0 ? (
        <span key={index}>{part}</span>
      ) : (
        <span key={index} className="highlight">
          {part}
        </span>
      )
    );
  };

  return (
    <div className="reports-table-container">
      <table id="reports-table-view">
        <thead className="thead-reports-table">
          <tr className="th-reports-table">
            {/* Define your table headers based on the structure of your data */}
            {selectedType === "Appointments" ? (
              <>
                <th>Service</th>
                <th>UserName</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
              </>
            ) : selectedType === "Records" ? (
              <>
                <th>Patient Name</th>
                <th>Weight</th>
                <th>Height</th>
                <th>Age</th>
                <th>Sex</th>
              </>
            ) : (
              <>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Stocks Available</th>
                <th>Item Price</th>
                <th>Expire Date</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {tableData ? (
            tableData.map((item) => (
              <tr key={item._id} className="tbody-tr-reports">
                {/* Adjust table data rendering based on the selected type */}
                {selectedType === "Appointments" ? (
                  <>
                    <td>{highlightText(item.service)}</td>
                    <td>{highlightText(item.UserName)}</td>
                    <td>{highlightText(item.appointmentDate)}</td>
                    <td>{highlightText(item.appointmentTime)}</td>
                  </>
                ) : selectedType === "Records" ? (
                  <>
                    <td>{highlightText(item.patientName)}</td>
                    <td>{highlightText(item.weight)}</td>
                    <td>{highlightText(item.height)}</td>
                    <td>{highlightText(item.age)}</td>
                    <td>{highlightText(item.sex)}</td>
                  </>
                ) : (
                  <>
                    <td>{highlightText(item.itemName)}</td>
                    <td>{highlightText(item.itemDescription)}</td>
                    <td>{highlightText(item.stocksAvailable)}</td>
                    <td>{highlightText(item.itemPrice)}</td>
                    <td>{highlightText(formatExpireDate(item.expireDate))}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
