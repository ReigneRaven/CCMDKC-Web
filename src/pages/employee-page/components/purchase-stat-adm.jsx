import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const socket = socketIOClient('http://localhost:5000');

export default function PurchaseStatus() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/purchase/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchData();

    socket.on('PurchaseStatusChanged', (updatedPurchase) => {
      setData((prevData) =>
        prevData.map((purchase) =>
          purchase._id === updatedPurchase._id ? updatedPurchase : purchase
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDetailsClick = (purchase) => {
    setSelectedPurchase(purchase);
    const adminId = Cookies.get('adminId');
    navigate(`/admin/reports/${adminId}`);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortBy === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <div className="purchase-container">
        <div className="purchase-wrapper-amn">
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
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((status) => (
                <tr key={status._id}>
                  <td>{status.UserName}</td>
                  <td>{status.itemName}</td>
                  <td>{status.quantity}</td>
                  <td>{status.modeCOD ? 'Cash on Delivery' : 'Over the Counter'}</td>
                  <td id="total-admin">₱{status.totalPrice}</td>
                  <td>{status.status}</td>
                  <td>
                    <button
                      id="purchase-details-btn"
                      onClick={() => handleDetailsClick(status)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {isModalOpen && (
        <div className="overlay">
          <div className="purchase-modal-container">
            <PurchaseModal
              onClose={() => {
                setIsModalOpen(false);
                setSelectedPurchase(null);
              }}
              purchase={selectedPurchase}
            />
          </div>
        </div>
      )} */}
    </>
  );
}
