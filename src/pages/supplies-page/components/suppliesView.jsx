import React, { useEffect, useState } from "react";
import axios from "axios";
import Head2 from "../../../components/headers/header";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuppliesView() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedItem, setEditedItem] = useState(null);
  const [editedDate, setEditedDate] = useState("");
  const [lowStockAlerts, setLowStockAlerts] = useState([]);
  const [expirationAlerts, setExpirationAlerts] = useState([]);

  const calculateDaysUntilExpiration = (expireDate) => {
    const today = new Date();
    const expirationDate = new Date(expireDate);
    const timeDifference = expirationDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  useEffect(() => {
    let isMounted = true;

    // Check if expiration alerts have already been shown
    const expirationAlertsShown = localStorage.getItem('expirationAlertsShown') === 'true';

    axios
      .get("http://localhost:5000/api/inventory")
      .then((response) => {
        if (isMounted) {
          setData(response.data);

          // Check for low stock items
          const lowStockItems = response.data.filter(item => parseInt(item.stocksAvailable) <= 60);
          setLowStockAlerts(lowStockItems);

          // Check for items expiring in the next two weeks
          const today = new Date();
          const twoWeeksFromNow = new Date(today);
          twoWeeksFromNow.setDate(today.getDate() + 14);

          const expiringItems = response.data.filter(item => {
            const expireDate = new Date(item.expireDate);
            return expireDate <= twoWeeksFromNow;
          });

          // Show expiration date alerts if not already shown
          if (!expirationAlertsShown) {
            expiringItems.forEach(item => {
              const daysLeft = calculateDaysUntilExpiration(item.expireDate);
              const toastId = toast.warn(`The item ${item.itemName} will expire in ${daysLeft} days at exactly ${formatDate(item.expireDate)}. Restock now!`);
              setExpirationAlerts(prevAlerts => [...prevAlerts, toastId]);
            });

            // Mark expiration alerts as shown in local storage
            localStorage.setItem('expirationAlertsShown', 'true');
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });

    // Cleanup function to run when the component is unmounted
    return () => {
      isMounted = false;
      toast.dismiss([...lowStockAlerts, ...expirationAlerts]);
    };
  }, []);

  useEffect(() => {
    // Check for low stock items whenever data changes
    const lowStockItems = data.filter(item => parseInt(item.stocksAvailable) <= 60);
    setLowStockAlerts(lowStockItems);

    // Dismiss existing low stock toasts before showing new ones
    toast.dismiss(lowStockAlerts);

    // Show low stock alerts
    lowStockItems.forEach(item => {
      const toastId = toast.error(`Stocks for ${item.itemName} are low. Only ${item.stocksAvailable} pieces left. Restock now!`);
      setLowStockAlerts(prevAlerts => [...prevAlerts, toastId]);
    });

    // Cleanup function to run when the component is unmounted
    return () => {
      toast.dismiss(lowStockAlerts);
    };
  }, [data]);

  useEffect(() => {
    // Dismiss existing expiration date toasts before showing new ones
    toast.dismiss(expirationAlerts);

    // Show expiration date alerts
    data.forEach(item => {
      const expireDate = new Date(item.expireDate);
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);

      if (expireDate <= twoWeeksFromNow) {
        const daysLeft = calculateDaysUntilExpiration(item.expireDate);
        const toastId = toast.warn(`The item ${item.itemName} will expire in ${daysLeft} days at exactly ${formatDate(item.expireDate)}. Restock now!`);
        setExpirationAlerts(prevAlerts => [...prevAlerts, toastId]);
      }
    });

    // Cleanup function to run when the component is unmounted
    return () => {
      toast.dismiss(expirationAlerts);
    };
  }, [data]);

  const filteredSupplies = data.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (item) => {
    setEditedItem(item);
    setEditedDate(formatDate(item.expireDate));
  };

  const handleSaveClick = () => {
    const editedItemWithFormattedDate = {
      ...editedItem,
      expireDate: editedDate,
    };

    axios
      .put(`http://localhost:5000/api/inventory/${editedItem._id}`, editedItemWithFormattedDate)
      .then((result) => {
        alert("Do you want to save your changes?");
        setEditedItem(null);

        setData((prevData) => {
          const updatedData = prevData.map((item) =>
            item._id === editedItem._id ? editedItemWithFormattedDate : item
          );
          return updatedData;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancelClick = () => {
    setEditedItem(null);
  };

  const handleDeleteClick = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/inventory/${itemId}`)
      .then((result) => {
        alert("Do you want to delete this item?");
        setData((prevData) => prevData.filter((item) => item._id !== itemId));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEditChange = (e, item) => {
    const { name, value } = e.target;

    if (name === "expireDate") {
      setEditedDate(value);
    }

    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="searchbar-supplies">
      <div className="searchbar-header">
        <Head2 text="Supplies" id="supplies-header" />
      </div>
      <input
        id="searchbar-supplies"
        type="text"
        placeholder=" Search item by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="supplies-table-content">
        <div className="supplies-table-container">
          <table className="table">
            <thead id="header-supplies">
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Availability</th>
                <th>Price</th>
                <th>Expiration Date</th>
                <th>Image</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupplies.map((item) => (
                <tr key={item._id} className={parseInt(item.stocksAvailable) <= 60 ? 'lowStock' : ''}>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="itemName"
                        className="supplies-change supplies-change-input"
                        value={editedItem.itemName}
                        onChange={(e) => handleEditChange(e, item)}
                      />
                    ) : (
                      item.itemName
                    )}
                  </td>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="itemDescription"
                        className="supplies-change supplies-change-input"
                        value={editedItem.itemDescription}
                        onChange={(e) => handleEditChange(e, item)}
                      />
                    ) : (
                      item.itemDescription
                    )}
                  </td>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="stocksAvailable"
                        className="supplies-change supplies-change-input"
                        value={editedItem.stocksAvailable}
                        onChange={(e) => handleEditChange(e, item)}
                      />
                    ) : (
                      item.stocksAvailable
                    )}
                  </td>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="itemPrice"
                        className="supplies-change supplies-change-input"
                        value={editedItem.itemPrice}
                        onChange={(e) => handleEditChange(e, item)}
                      />
                    ) : (
                      `₱${item.itemPrice}`
                    )}
                  </td>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="expireDate"
                        className="supplies-change supplies-change-input"
                        value={editedDate}
                        onChange={(e) => handleEditChange(e, item)}
                      />
                    ) : (
                      formatDate(item.expireDate)
                    )}
                  </td>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="itemImg"
                        className="supplies-change supplies-change-input"
                        value={editedItem.itemImg}
                        onChange={(e) => handleEditChange(e, item)}
                      />
                    ) : (
                      <img
                        src={`http://localhost:5000/${item.itemImg}`}
                        alt={item.itemName}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </td>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <div className="actionButtons">
                        <button className="editButton" onClick={handleSaveClick} id="supplies-save-btn">
                          Save
                        </button>
                        <button className="editButton" onClick={handleCancelClick} id="supplies-cancel-btn">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="actionButtons">
                        <button onClick={() => handleEditClick(item)} id="supplies-edit-btn">
                          Edit
                        </button>
                        <button
                          className="deleteButton"
                          onClick={() => handleDeleteClick(item._id)}
                          id="supplies-delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
