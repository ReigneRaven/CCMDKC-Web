import React, { useEffect, useState } from "react";
import axios from "axios";
import Head2 from "../../../components/headers/header";

export default function SuppliesView() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedItem, setEditedItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  const filteredSupplies = data.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (item) => {
    setEditedItem(item);
  };

  const handleSaveClick = () => {
    // Send a PUT request to update the item's details
    axios
      .put(`http://localhost:5000/api/inventory/${editedItem._id}`, editedItem)
      .then((result) => {
        alert('Do you want to save your changes?')
        setEditedItem(null);

        // Update the local state with the modified data
        setData((prevData) => {
          const updatedData = prevData.map((item) =>
            item._id === editedItem._id ? editedItem : item
          );
          return updatedData;
        });
      })
      .catch((err) => {
        console.error(err);
        // Handle the error here
      });
  };

  const handleCancelClick = () => {
    setEditedItem(null);
  };

  const handleDeleteClick = (itemId) => {
    // Send a DELETE request to remove the item
    axios
      .delete(`http://localhost:5000/api/inventory/${itemId}`)
      .then((result) => {
        alert('Do you want to delete this item?')
        setData((prevData) => prevData.filter((item) => item._id !== itemId));
      })
      .catch((err) => {
        console.error(err);
        // Handle the error here
      });
  };

  const handleEditChange = (e, item) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
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
                <th>Image</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {filteredSupplies.map((item) => (
                <tr key={item._id}>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="itemName"
                        className="supplies-change"
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
                        className="supplies-change"
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
                        className="supplies-change"
                        value={editedItem.itemPrice}
                        onChange={(e) => handleEditChange(e, item)}
                      />
                    ) : (
                      item.itemPrice
                    )}
                  </td>
                  <td>
                    {editedItem && editedItem._id === item._id ? (
                      <input
                        type="text"
                        name="itemImg"
                        className="supplies-change"
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
                        <button className="editButton" onClick={handleSaveClick}>Save</button>
                        <button className="editButton" onClick={handleCancelClick}>Cancel</button>
                      </div>
                    ) : (
                      <div className="actionButtons">
                        <button onClick={() => handleEditClick(item)} id="supplies-edit-btn">Edit</button>
                        <button className="deleteButton" onClick={() => handleDeleteClick(item._id)} id="supplies-delete-btn">Delete</button>
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