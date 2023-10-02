import React from "react";
import '../supplies.css'

export default function Input({ setNewItem, setDescription, setStocks, newItem, description, stocks}) {
  return (
    <div className="stocks-input">
      <div className="margin"></div>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Product Name"
        required={true}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product Description"
        required={true}
      />
      <input
        type="text"
        value={stocks}
        onChange={(e) => setStocks(e.target.value)}
        placeholder="Number of Stocks Available"
        required={true}
      />
 
    </div>
  );
}
