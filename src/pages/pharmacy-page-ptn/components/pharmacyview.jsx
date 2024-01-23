import React, { useEffect, useState } from "react";
import axios from "axios";
import Head2 from "../../../components/headers/header";
import { FaShoppingCart } from "react-icons/fa";
import PharmacyCard from "./pharmacycard";

export default function PharmacyView() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")  // Updated endpoint to fetch inventory data
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  const filteredItems = data.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pharmacy-table-content">
      <div className="pharmacy-table-container">
        <Head2 text="PHARMACY" id="pharmacy-header"></Head2>
        <input
          id="searchbar-pharmacy"
          type="text"
          placeholder=" Search item by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaShoppingCart className="cart-icon" />
      </div>
      <div className="card-container">
        {filteredItems.map((item) => (
          <PharmacyCard key={item._id} item={item} /> 
        ))}
      </div>
    </div>
  );
}
