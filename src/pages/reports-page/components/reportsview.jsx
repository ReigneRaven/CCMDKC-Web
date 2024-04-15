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
                  <th>Medical History</th>
                  {/* <th>Allergies</th>
                  <th>Diagnosis</th>
                  <th>Blood Pressure</th>
                  <th>Temperature</th>
                  <th>Surgeries</th> */}
                  {/* <th>Date created</th> */}
                </>
              ) : selectedType === "Inventory" ? (
                <>
                  <th>Item Name</th>
                  <th>Item Description</th>
                  <th>Stocks Available</th>
                  <th>Item Price</th>
                  <th>Expire Date</th>
                </>
              ) : selectedType === "Users" ? (
                <>
                  <th>Full Name</th>
                  <th>Birthday</th>
                  <th>Sex</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Username</th>
                  <th>Email</th>
                </>
              ) : (
                <>
                  <th>Username</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Mode of Payment</th>
                  <th>Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Render table rows based on selectedType */}
            {filteredTableData ? (
              filteredTableData.map((item) => (
                <tr key={item._id} className={`tbody-tr-reports ${selectedType === "Records" ? "records-row" : ""}`}>
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
                      <td id='records-table-pn'>{highlightText(item.patientName)}</td>
                      <td id='records-table'>{highlightText(item.weight)}</td>
                      <td id='records-table'>{highlightText(item.height)}</td>
                      <td id='records-table'>{highlightText(item.age)}</td>
                      <td id='records-table'>{highlightText(item.sex)}</td>

                      {item.medicalHistory && Array.isArray(item.medicalHistory) && item.medicalHistory.length > 0 ? (
                        item.medicalHistory.map((historyItem) => (
                          <div key={historyItem._id} className='medhistory'>
                            <p>Allergies: {highlightText(historyItem.allergies)}</p>
                            <p>Diagnosis: {highlightText(historyItem.diagnosis)}</p>
                            <p>Blood Pressure: {highlightText(historyItem.bloodPressure)}</p>
                            <p>Temperature: {highlightText(historyItem.temperature)}</p>
                            <p>Surgeries: {highlightText(historyItem.surgeries)}</p>
                          </div>
                        ))
                      ) : (
                        <td colSpan={6}>No medical history available</td>
                      )}
                    </>
                  ) : selectedType === "Inventory" ? (
                    <>
                      <td>{highlightText(item.itemName)}</td>
                      <td>{highlightText(item.itemDescription)}</td>
                      <td>{highlightText(item.stocksAvailable)}</td>
                      <td>{highlightText(item.itemPrice ? `₱${item.itemPrice}` : "")}</td>
                      <td>{highlightText(formatDate(item.expireDate, false))}</td>
                    </>
                  ) : selectedType === "Users" ? (
                    <>
                      <td>{highlightText(`${item.FirstName} ${item.MiddleName} ${item.LastName}`)}</td>
                      <td>{highlightText(formatDate(item.birthday, true))}</td>
                      <td>{highlightText(item.sex)}</td>
                      <td>{highlightText(item.contactNum)}</td>
                      <td>{highlightText(`${item.houseNum} ${item.street} ${item.brgy} ${item.city} ${item.prov}`)}</td>
                      <td>{highlightText(item.UserName)}</td>
                      <td>{highlightText(item.email)}</td>
                    </>
                  ) : (
                    <>
                      <td>{highlightText(item.UserName)}</td>
                      <td>{highlightText(item.itemName)}</td>
                      <td>{highlightText(item.quantity)}</td>
                      <td>{highlightText(item.totalPrice ? `₱${item.totalPrice}` : "")}</td>
                      <td>{highlightText(item.modeCOD ? "Cash on Delivery" : "Over the Counter")}</td>
                      <td>{highlightText(item.status)}</td>
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
    if (typeof text !== 'string' && typeof text !== 'number') {
      return text;
    }

    if (!searchedQuery || !text) return text;

    const regex = new RegExp(`(${searchedQuery})`, "gi");

    // Convert numeric values to string before splitting
    const parts = String(text).split(regex);

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
    Users: "Users",
    Orders: "Orders",
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
    if (selectedType === "Appointments" && searchedQuery.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
      // If it's an appointment search and the searchedQuery is a valid date format
      return item.appointmentDate === searchedQuery;
    } else {
      // Default behavior for other types of searches or invalid date format
      return Object.entries(item).some(([key, value]) => {
        if (key === 'medicalHistory' && Array.isArray(value)) {
          // Search within the medical history array
          return value.some((historyItem) => {
            return Object.values(historyItem).some((historyValue) => {
              if (typeof historyValue === 'string' || historyValue instanceof Date) {
                const formattedHistoryValue = formatDate(historyValue, true);
                const isMatch = new RegExp(`\\b${searchedQuery}\\b`, 'i').test(historyValue) || new RegExp(`\\b${searchedQuery}\\b`, 'i').test(formattedHistoryValue);
                return isMatch;
              }
              return false;
            });
          });
        }
  
        if (key === 'modeCOD' && (searchedQuery.toLowerCase() === 'cash on delivery' || searchedQuery.toLowerCase() === 'over the counter')) {
          const isCashOnDelivery = searchedQuery.toLowerCase() === 'cash on delivery';
          return value === isCashOnDelivery;
        }
  
        if (typeof value === 'string') {
          // Generic search logic for other fields
          if (key !== 'modeCOD') {
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
            if (selectedType === "Users" && (key.includes("Name") || key.includes("houseNum") || key.includes("street") || key.includes("brgy") || key.includes("city") || key.includes("prov"))) {
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
  
            if (selectedType === "Orders" && key === "totalPrice") {
              const numericPrice = item.totalPrice; // assuming totalPrice is a numeric field
              const searchQueryWithPesoSign = searchedQuery.replace("₱", ""); // Remove peso sign from the search query
  
              return isMatch || new RegExp(`\\b${searchQueryWithPesoSign}\\b`, 'i').test(numericPrice.toString());
            }

          // Check for AM/PM suffix in appointmentTime when selectedType is "Appointments"
          if (selectedType === "Appointments" && key === "appointmentTime") {
            const timeWithAmPm = getAmPmSuffix(item.appointmentTime);
            return isMatch || new RegExp(`\\b${searchedQuery}\\b`, 'i').test(timeWithAmPm);
          }
            return isMatch;
          }
        }
        if (value instanceof Date) {
          return value.toISOString().includes(searchedQuery);
        }
        return false;
      });
    }
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
            Print PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportsView;
