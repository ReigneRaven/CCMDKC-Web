import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SuppliesView() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  return (
    <div className="supplies-table-content">
      <div className="supplies-table-container">
      <input 
            id="searchbar-supplies"
            type="text"
            placeholder="Search item by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
        <table className="table">
          <thead id="header-supplies">
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>{item.itemDescription}</td>
                <td>{item.stocksAvailable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
