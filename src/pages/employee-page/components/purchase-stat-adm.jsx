import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

export default function PurchaseStatus() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("latest"); // "latest" or "oldest"

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/purchase/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchData();

    // Set up Socket.IO to listen for real-time updates
    socket.on('PurchaseStatusChanged', (updatedPurchase) => {
      // Update the state with the changed purchase
      setData((prevData) =>
        prevData.map((purchase) =>
          purchase._id === updatedPurchase._id ? updatedPurchase : purchase
        )
      );
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.createdAt); // Replace 'createdAt' with the actual field in your data representing the purchase date
    const dateB = new Date(b.createdAt); // Replace 'createdAt' with the actual field in your data representing the purchase date
    return sortBy === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <div className="purchase-container">
        <div className="purchase-wrapper">
          <p id="order-stat">Order Tracker</p>

          <div className="sort-dropdown-order-adm">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" value={sortBy} onChange={handleSortChange}>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <table className="table-order-stat">
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Mode of Payment</th>
                <th>Total Price</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((status) => (
                <tr key={status._id}>
                  <td>{status.UserName}</td>
                  <td>{status.itemName}</td>
                  <td>{status.quantity}</td>
                  <td>{status.modeCOD ? 'Cash on Delivery' : 'Other Payment Method'}</td>
                  <td id="total-admin">₱{status.totalPrice}</td>
                  <td>{status.status}</td>
                  <td><button>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
