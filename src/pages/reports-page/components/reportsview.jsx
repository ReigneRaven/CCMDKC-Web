import React, { useState } from 'react';
import { useReactToPrint } from 'react-to-print';

class PrintableContent extends React.Component {
  render() {
    const { header, filteredTableData, selectedType, highlightText, formatDate, getAmPmSuffix } = this.props;

    return (
      <div className="reports-table-container">
        {/* Printable header */}
        <div className="printable-header">
          <h2>{header}</h2>
        </div>

        {/* Printable table */}
        <table id="reports-table-view">
          <thead className="thead-reports-table">
            <tr className="th-reports-table">
              {/* Render table headers based on selectedType */}
              {selectedType === "Appointments" ? (
                <>
                  <th>UserName</th>
                  <th>Service</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Status</th>
                </>
              ) : selectedType === "Records" ? (
                <>
                  <th>Patient Name</th>
                  <th>Weight</th>
                  <th>Height</th>
                  <th>Age</th>
                  <th>Sex</th>
                </>
              ) : selectedType === "Inventory" ? (
                <>
                  <th>Item Name</th>
                  <th>Item Description</th>
                  <th>Stocks Available</th>
                  <th>Item Price</th>
                  <th>Expire Date</th>
                </>
              ) : (
                <>
                  <th>Full Name</th>
                  <th>Birthday</th>
                  <th>Sex</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Username</th>
                  <th>Email</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Render table rows based on selectedType */}
            {filteredTableData ? (
              filteredTableData.map((item) => (
                <tr key={item._id} className="tbody-tr-reports">
                  {selectedType === "Appointments" ? (
                    <>
                      <td>{highlightText(item.UserName)}</td>
                      <td>{highlightText(item.service)}</td>
                      <td>{highlightText(formatDate(item.appointmentDate))}</td>
                      <td>
                        {item.appointmentTime ? (
                          <>
                            {highlightText(item.appointmentTime)}{' '}
                            {getAmPmSuffix(new Date(item.appointmentTime).getHours())}
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{highlightText(item.status)}</td>
                    </>
                  ) : selectedType === "Records" ? (
                    <>
                      <td>{highlightText(item.patientName)}</td>
                      <td>{highlightText(item.weight)}</td>
                      <td>{highlightText(item.height)}</td>
                      <td>{highlightText(item.age)}</td>
                      <td>{highlightText(item.sex)}</td>
                    </>
                  ) : selectedType === "Inventory" ? (
                    <>
                      <td>{highlightText(item.itemName)}</td>
                      <td>{highlightText(item.itemDescription)}</td>
                      <td>{highlightText(item.stocksAvailable)}</td>
                      <td>{highlightText(item.itemPrice ? `₱${item.itemPrice}` : "")}</td>
                      <td>{highlightText(formatDate(item.expireDate))}</td>
                    </>
                  ) : (
                    <>
                      <td>{highlightText(`${item.FirstName} ${item.MiddleName} ${item.LastName}`)}</td>
                      <td>{highlightText(formatDate(item.birthday, true))}</td>
                      <td>{highlightText(item.sex)}</td>
                      <td>{highlightText(item.contactNum)}</td>
                      <td>{highlightText(`${item.houseNum} ${item.street} ${item.brgy} ${item.city} ${item.prov}`)}</td>
                      <td>{highlightText(item.UserName)}</td>
                      <td>{highlightText(item.email)}</td>
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
}

export default function ReportsView({ tableData, selectedType, searchedQuery, generateButtonClicked }) {
  const [sortBy, setSortBy] = useState("latest");
  const componentRef = React.useRef();

  // Function to format date to MM/DD/YYYY
  const formatDate = (dateString, isBirthday) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    if (isBirthday) {
      return date.toLocaleDateString('en-US', options).replace(/\//g, '/');
    }

    return date.toLocaleDateString('en-US', options);
  };

  // Case-insensitive highlighting function
  const highlightText = (text) => {
    if (!searchedQuery || !text) return text;

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

  // Helper function to get AM/PM suffix based on hour
  const getAmPmSuffix = (hours) => (hours >= 12 ? 'pm' : 'am');

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Define headers for specific types
  const headers = {
    Appointments: "Appointments",
    Records: "Records",
    Inventory: "Inventory",
    User: "User",
    // Add more headers for other types as needed
  };

  const sortedTableData = [...tableData].sort((a, b) => {
    let keyA, keyB;
    switch (selectedType) {
      case "Appointments":
        keyA = new Date(a.appointmentDate);
        keyB = new Date(b.appointmentDate);
        break;
      case "Records":
        keyA = new Date(a.age);
        keyB = new Date(b.age);
        break;
      default:
        keyA = new Date(a.expireDate);
        keyB = new Date(b.expireDate);
        break;
    }
    return sortBy === "latest" ? keyB - keyA : keyA - keyB;
  });

  const filteredTableData = sortedTableData.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && searchedQuery
        ? (
          new RegExp(`\\b${searchedQuery}\\b`, 'i').test(value)
        )
        : false
    )
  );

  return (
    <div>
      <div className="sort-dropdown-reports">
        <label htmlFor="sort">Sort By: </label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Printable content */}
      <PrintableContent
        ref={componentRef}
        header={headers[selectedType] || ''}
        filteredTableData={filteredTableData}
        selectedType={selectedType}
        highlightText={highlightText}
        formatDate={formatDate}
        getAmPmSuffix={getAmPmSuffix}
      />

      {/* Button to trigger printing */}
      {generateButtonClicked && (
        <button id="generate-pdf-btn" onClick={handlePrint}>
          Generate PDF
        </button>
      )}
    </div>
  );
}
