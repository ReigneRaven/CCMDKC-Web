import React, { useState } from 'react';

export default function ReportsView({ tableData, selectedType, searchedQuery }) {
  const [sortBy, setSortBy] = useState("latest");

  // Function to format date to MM/DD/YYYY
  const formatDate = (dateString, isBirthday) => {
    if (!dateString) {
      return ""; // Display "" for cases where date is not applicable
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Display "Invalid Date" for cases where date is not a valid date
    }

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    if (isBirthday) {
      // Custom format for birthday
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

      <div className="reports-table-container">
        <table id="reports-table-view">
          <thead className="thead-reports-table">
            <tr className="th-reports-table">
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
                          "" // Display "" when appointment time is not available
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
    </div>
  );
}
