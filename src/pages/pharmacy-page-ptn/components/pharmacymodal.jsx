import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const PharmModal = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [modeCOD, setModeCOD] = useState(false);
  const [totalPrice, setTotalPrice] = useState(item.itemPrice);

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

  const handleSubmit = () => {
    navigate(`/patient/${userId}`)

    onClose();
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

        <form id="modal-form-pharm" >
          <div className="pharmDetailsMed">
            <div className="qty-group">
              <label htmlFor="quantity-input" id="qty-modal-p">
                <strong>Quantity</strong>
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
                <strong>Mode of Payment</strong>
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
              <strong>
                Total:&nbsp;&nbsp;&nbsp;
                <span id="total-price-modal">₱{totalPrice}</span>
              </strong>
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
