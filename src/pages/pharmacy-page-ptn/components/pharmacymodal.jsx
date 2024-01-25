import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const PharmModal = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [modeCOD, setModeCOD] = useState(false);
  const [totalPrice, setTotalPrice] = useState(item.itemPrice);
  const [UserName, setUserName] = useState('')

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Update total price whenever quantity or item price changes
    setTotalPrice(quantity * item.itemPrice);
  }, [quantity, item.itemPrice]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setQuantity(newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleModeChange = () => {
    // Toggle the mode of payment between true and false
    setModeCOD(!modeCOD);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/purchase/", {
        UserName,
        quantity,
        modeCOD,
        itemId: item.itemId,  
        itemName: item.itemName,  
        totalPrice
      });
  
      // Log the response or handle it as needed
      console.log(response.data);
      
       // Update the stocksAvailable value
    const updatedStock = item.stocksAvailable - quantity;
    await axios.put(`http://localhost:5000/api/inventory/${item._id}`, {
      stocksAvailable: updatedStock,
    });

      // Navigate to the patient page with both userId and UserName
      navigate(`/patient/${userId}`, { state: { userId, UserName } });
  
      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error recording purchase:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  }

  return (
    <>
      <div className="modalPharm">
        <div className="modalPharmImg">
          <img
            id="pharmModalImg"
            src={`http://localhost:5000/${item.itemImg}`}
            alt={item.itemName}
            style={{ maxWidth: "100vw", maxHeight: "250px" }}
          />
        </div>

        <form id="modal-form-pharm" >
          <div className="pharmDetailsMed">
          <p id="product-name-p">{item.itemName}</p>
            <div className="qty-group">
            <input
                type="text"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder=" Username"
                className="input-username"
              />
              <label htmlFor="quantity-input" id="qty-modal-p">
                Quantity
              </label>
              <div className="qty-counter">
                <button
                  type="button"
                  onClick={decrementQuantity}
                  id="decrement-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button
                  type="button"
                  onClick={incrementQuantity}
                  id="increment-btn"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mode-section">
              <p id="mode-modal-p">
                Mode of Payment
              </p>
              <div className="mode-group">
                <input
                  type="radio"
                  id="mode-cod"
                  checked={modeCOD}
                  onChange={handleModeChange}
                />
                <label htmlFor="mode-cod" id="radio-label">
                  Cash On Delivery
                </label>
              </div>
            </div>
            <p id="total-p">
              
                Total:&nbsp;&nbsp;&nbsp;
                <span id="total-price-modal">₱{totalPrice}</span>
             
            </p>
          </div>
          <button type="button" id="buy-now-btn" onClick={handleSubmit}>
            Buy Now
          </button>
        </form>
      </div>

      <button onClick={onClose} id="close-btn-pharm">
        X
      </button>
    </>
  );
};

export default PharmModal;
