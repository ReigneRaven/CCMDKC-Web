import React from "react";

const PharmModal = ({ item }) => {

    return(
        <>
       <div className="modalPharm">
        <div className="modalPharmImg">
       <img
        id="pharmModalImg"
          src={`http://localhost:5000/${item.itemImg}`}
          alt={item.itemName}
          style={{ maxWidth: "100vw", maxHeight: "350px"}}
        />
        </div>
        <div className="pharmDetailsMed">
        <p id="qty-modal">
            Quantity
        </p>
        </div>
       </div>
        
        </>
    )



}
export default PharmModal