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
                            {highlightText(getAmPmSuffix(item.appointmentTime))}
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
                      <td>{highlightText(formatDate(item.expireDate, false))}</td>
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

const ReportsView = ({ tableData, selectedType, searchedQuery, generateButtonClicked }) => {
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
      month: 'numeric',
      day: 'numeric',
    };

    if (isBirthday) {
      return date.toLocaleDateString('en-US', options).replace(/(^|\/)0+/g, '$1');
    }

    return date.toLocaleDateString('en-US', options).replace(/(^|\/)0+/g, '$1');
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

  // Helper function to get AM/PM suffix based on time
  const getAmPmSuffix = (timeString) => {
    if (!timeString) {
      return '';
    }

    const time = new Date(`1970-01-01T${timeString}`);
    const hours = time.getHours();
    const suffix = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${String(time.getMinutes()).padStart(2, '0')} ${suffix}`;
  };

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

  const filteredTableData = sortedTableData.filter((item) => {
    return Object.entries(item).some(([key, value]) => {
      if (typeof value === 'string') {
        const formattedValue = formatDate(value, true);
        const isMatch = new RegExp(`\\b${searchedQuery}\\b`, 'i').test(value) || new RegExp(`\\b${searchedQuery}\\b`, 'i').test(formattedValue);

        if (selectedType === "Records" && key === "height") {
          // Extract feet and inches from the height
          const [feet, inches] = value.split("'").map(part => parseInt(part));
          const userSearchQuery = searchedQuery.split("'").map(part => parseInt(part));

          // Compare feet and inches with the user's search query
          return isMatch || (feet === userSearchQuery[0] && inches === userSearchQuery[1]);
        }

        // Handle special cases for full name and address search when selectedType is "User"
        if (selectedType === "User" && (key.includes("Name") || key.includes("houseNum") || key.includes("street") || key.includes("brgy") || key.includes("city") || key.includes("prov"))) {
          const fullName = `${item.FirstName} ${item.MiddleName} ${item.LastName}`;
          const fullAddress = `${item.houseNum} ${item.street} ${item.brgy} ${item.city} ${item.prov}`;
          return isMatch || new RegExp(`\\b${searchedQuery}\\b`, 'i').test(fullName) || new RegExp(`\\b${searchedQuery}\\b`, 'i').test(fullAddress);
        }

        // Check for currency sign in itemPrice when selectedType is "Inventory"
        if (selectedType === "Inventory" && key === "itemPrice") {
          const priceWithCurrencySign = `₱${item.itemPrice}`;
          const numericPrice = item.itemPrice; // assuming itemPrice is a numeric field
          const searchQueryWithPesoSign = searchedQuery.replace("₱", ""); // Remove peso sign from the search query
          return isMatch || new RegExp(`\\b${searchQueryWithPesoSign}\\b`, 'i').test(priceWithCurrencySign) || new RegExp(`\\b${searchedQuery}\\b`, 'i').test(numericPrice);
        }

        // Check for AM/PM suffix in appointmentTime when selectedType is "Appointments"
        if (selectedType === "Appointments" && key === "appointmentTime") {
          const timeWithAmPm = getAmPmSuffix(item.appointmentTime);
          return isMatch || new RegExp(`\\b${searchedQuery}\\b`, 'i').test(timeWithAmPm);
        }

        return isMatch;
      }
      if (value instanceof Date) {
        return value.toISOString().includes(searchedQuery);
      }
      return false;
    });
  });

  return (
    <div>
      <div className="sort-dropdown-reports">
        <label htmlFor="sort" id='sort-reports'>Sort By: </label>
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
        <div className="reports-btn-pdf">
        <button id="generate-pdf-btn" onClick={handlePrint}>
          Generate PDF
        </button>
        </div>
      )}
    </div>
  );
};

export default ReportsView;
