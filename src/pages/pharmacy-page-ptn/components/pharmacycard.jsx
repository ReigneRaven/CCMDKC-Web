import React, { useState } from "react";
import PharmModal from "./pharmacymodal";

const PharmacyCard = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewMed = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="card">
        <img
          src={`http://localhost:5000/${item.itemImg}`}
          alt={item.itemName}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.itemName}</h5>
          <p className="card-text">{item.itemDescription}</p>
          <p className="card-price">{item.price}</p>
          <p className="card-price">₱ {item.itemPrice}</p>
          <button id="add-cart" onClick={handleViewMed}>
            Add to Cart
          </button>
        </div>
      </div>

      {showModal && (
        <div className="overlay">
          <div className="pharm-modal-container">
            <PharmModal
             item={item}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PharmacyCard;
