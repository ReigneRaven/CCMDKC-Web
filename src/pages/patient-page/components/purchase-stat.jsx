import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:5000');

const PurchaseStatus = () => {
  const [purchases, setPurchases] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [processedPurchases, setProcessedPurchases] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    axios.get(`http://localhost:5000/api/user/${userId}`)
      .then(response => setLoggedInUser(response.data))
      .catch(error => console.error('Error fetching user:', error));

    axios.get(`http://localhost:5000/api/purchase/getPurchase/${userId}`)
      .then(response => {
        const formattedPurchases = response.data.map(purchase => ({
          ...purchase,
        }));
        setPurchases(formattedPurchases);
      })
      .catch(error => console.error('Error fetching purchases:', error));

    socket.on('PurchaseStatusChanged', (data) => {
      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase._id === data.purchaseId
            ? { ...purchase, status: data.orderStatus }
            : purchase
        )
      );
    });

    // Retrieve processed purchases from local storage
    const storedProcessedPurchases = JSON.parse(localStorage.getItem('processedPurchases')) || [];
    setProcessedPurchases(storedProcessedPurchases);

    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to run only on mount and unmount

  const handleOrderReceived = (purchaseId) => {
    // Check if the purchase has already been processed
    if (processedPurchases.includes(purchaseId)) {
      // Purchase has already been processed, do not proceed
      return;
    }

    axios.put(`http://localhost:5000/api/purchase/${purchaseId}/orderstatus`,
        { status: 'Order Received' })
        .then(response => {
          const updatedPurchase = response.data;

          // Mark the purchase as processed in state
          setProcessedPurchases(prevProcessedPurchases => [...prevProcessedPurchases, purchaseId]);

          // Save processed purchases to local storage
          localStorage.setItem('processedPurchases', JSON.stringify([...processedPurchases, purchaseId]));

          setPurchases(prevPurchases =>
            prevPurchases.map(purchase =>
              purchase._id === updatedPurchase._id ? updatedPurchase : purchase
            ));
          socket.emit('PurchaseStatusChanged', { purchaseId, orderStatus: 'Order Received' });
        })
        .catch(error => {
          console.error('Error receiving the Order', error);
        });
  };

  const filteredPurchases = purchases.filter(purchase =>
    purchase.UserName === loggedInUser?.UserName
  );

  return (
    <>
      <div className="purchase-container">
        <div className="purchase-wrapper">
          <p id="order-stat">Order Tracker</p>
          <table className="table-order-stat">
            <thead>
              <tr className="head-stat">
                <th>Username</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Mode of Payment</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((purchase) => (
                <tr key={purchase._id} className="purchase-row">
                  <td>{purchase.UserName}</td>
                  <td>{purchase.itemName}</td>
                  <td>{purchase.quantity}</td>
                  <td>{purchase.modeCOD ? 'Cash on Delivery' : 'Other Payment Method'}</td>
                  <td id="totalprice-stats">₱{purchase.totalPrice}</td>
                  <button
                    id="received-btn"
                    onClick={() => handleOrderReceived(purchase._id)}
                    className={processedPurchases.includes(purchase._id) ? 'disabled-button' : ''}
                    disabled={processedPurchases.includes(purchase._id)}
                  >
                    Order Received
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PurchaseStatus;
