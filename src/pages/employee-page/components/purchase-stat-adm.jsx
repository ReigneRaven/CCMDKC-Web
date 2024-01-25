import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

export default function PurchaseStatus() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch initial data
    axios.get("http://localhost:5000/api/purchase/all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });

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

  return (
    <>
      <div className="purchase-container">
        <div className="purchase-wrapper">
          <p id="order-stat">Order Tracker</p>
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
              {data.map((status) => (
                <tr key={status._id}>
                  <td>{status.UserName}</td>
                  <td>{status.itemName}</td>
                  <td>{status.quantity}</td>
                  <td>{status.modeCOD ? 'Cash on Delivery' : 'Other Payment Method'}</td>
                  <td>{status.totalPrice}</td>
                  <td>{status.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
