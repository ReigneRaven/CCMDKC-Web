import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie';

const PharmModal = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(0);
  const [modeCOD, setModeCOD] = useState(false);
  const [modeOTC, setModeOTC] = useState(false);
  const [totalPrice, setTotalPrice] = useState(item.itemPrice);
  const [UserName, setUserName] = useState('');
  const [isValidQuantity, setIsValidQuantity] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State to track button click
  const navigate = useNavigate();
  const userId = Cookies.get('userId');

  useEffect(() => {
    // Update total price whenever quantity or item price changes
    setTotalPrice(quantity * item.itemPrice);
  }, [quantity, item.itemPrice]);

  const handleKeyPress = (e) => {
    if (e.key === 'e') {
      e.preventDefault();
    }
  };

  const handleQuantityChange = (e) => {
    const inputQuantity = e.target.value;
    if (inputQuantity === "" || (parseInt(inputQuantity, 10) >= 0 && !isNaN(inputQuantity))) {
      setQuantity(inputQuantity);
      setIsValidQuantity(true);
    } else {
      setIsValidQuantity(false);
      setTimeout(() => {
        setIsValidQuantity(true);
      }, 3000);
    }
  };  

  const decrementQuantity = () => {
    const diff = 1; // Change this to adjust the decrement amount
    setQuantity(prevQuantity => Math.max(0, prevQuantity - diff));
  };
    
  const incrementQuantity = () => {
    const sum = 1; // Change this to adjust the increment amount
    setQuantity(parseInt(quantity, 10) + sum);
    setIsValidQuantity(true);
  };
  

  const handleModeChange = () => {
    setModeCOD(true);
    setModeOTC(false);
  };
  
  const handleOTCChange = () => {
    setModeOTC(true);
    setModeCOD(false);
  };

  const calculateTotalPrice = () => {
    let rawTotalPrice = quantity * item.itemPrice;
    let formattedTotalPrice = rawTotalPrice.toFixed(2); // Round to two decimal places
    return formattedTotalPrice;
  };
  
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [quantity, item.itemPrice]);

  const handleSubmit = async () => {
    try {
      if (isButtonClicked) return; // Prevent double-click if button already clicked
      setIsButtonClicked(true); // Set button as clicked
      if (!UserName) {
        alert("Please enter a username");
        setIsButtonClicked(false); // Reset button state
        return;
      }
      if (!quantity) {
        alert("Please enter a quantity");
        setIsButtonClicked(false); // Reset button state
        return;
      }
      if (parseInt(quantity, 10) < 20) {
        setIsValidQuantity(false);
        alert("Minimum quantity is 20");
        setIsButtonClicked(false); // Reset button state
        return;
      }
      if (!modeCOD && !modeOTC) {
        alert("Please select a mode of payment");
        setIsButtonClicked(false); // Reset button state
        return;
      }
      const response = await axios.post("http://localhost:5000/api/purchase/", {
        UserName,
        quantity,
        modeCOD,
        itemId: item.itemId,
        itemName: item.itemName,
        totalPrice: calculateTotalPrice(),
      });
  
      console.log("Purchase recorded successfully:", response.data);
  
      const updatedStock = item.stocksAvailable - quantity;
      await axios.put(`http://localhost:5000/api/inventory/${item._id}`, {
        stocksAvailable: updatedStock,
      });
  
      console.log("Inventory updated successfully");
  
      navigate(`/patient/${userId}`, { state: { userId, UserName } });
  
      onClose();
    } catch (error) {
      console.error("Error recording purchase:", error.response?.data || error.message);
      setIsButtonClicked(false); // Reset button state
    }
  };

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
        
        <div className="pharm-modal-new">
          <div className="button-container">
            <button onClick={onClose} id="close-btn-pharm">
              X
            </button>
          </div>
          <form id="modal-form-pharm" >
            <div className="pharmDetailsMed">
              <div className="qty-group">
                <div className="product-info">
                  <p id="product-name-p">{item.itemName}</p>
                  <p id="product-stock-p"><span id="span-stock">{item.stocksAvailable}</span> stocks left</p>
                </div>
                <input
                  type="text"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder=" Username"
                  className="input-username"
                  id="username-pharm"
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
                    onKeyPress={handleKeyPress}
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
                  
                  <input
                    type="radio"
                    id="mode-pickup"
                    checked={modeOTC}
                    onChange={handleOTCChange}
                  />
                  <label htmlFor="mode-pickup" id="radio-label">
                    Over the Counter
                  </label>
                </div>
              </div>
              <p id="total-p">
                Total:&nbsp;&nbsp;&nbsp;
                <span id="total-price-modal">₱{calculateTotalPrice()}</span>
              </p>
            </div>
            <button type="button" id="buy-now-btn" onClick={handleSubmit} disabled={isButtonClicked}>
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PharmModal;
