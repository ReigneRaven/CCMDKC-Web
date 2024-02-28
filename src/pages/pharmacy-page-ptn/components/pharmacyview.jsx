import React, { useEffect, useState } from "react";
import axios from "axios";
import Head2 from "../../../components/headers/header";
import { FaShoppingCart } from "react-icons/fa";
import PharmacyCard from "./pharmacycard";
import PharmModal from "../components/pharmacymodal"; // Make sure to import the correct file path
import Cookies from "js-cookie";

export default function PharmacyView() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [UserName, setUserName] = useState("")
  
  useEffect(() => {
    const storedUserId = Cookies.get("userId");
    setUserId(storedUserId);

    if (storedUserId) {
      axios
        .get(`http://localhost:5000/api/user/${storedUserId}`)
        .then((response) => {
          console.log('User Details', response.data);
          setUserName(response.data.UserName)
        })
        .catch((error) => console.error(error));
    }
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  }, []);

  const filteredItems = data.filter((item) =>
    //item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    item.itemName.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="pharmacy-table-content">
      <div className="pharmacy-table-container">
        <Head2 text="PHARMACY" id="pharmacy-header"></Head2>
        <input
          id="searchbar-pharmacy"
          type="text"
          placeholder=" Search item by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <FaShoppingCart className="cart-icon" /> */}
      </div>
      <div className="card-container">
        {filteredItems.map((item) => (
          <PharmacyCard key={item._id} item={item} onClick={() => openModal(item)} />
        ))}
      </div>
      {isModalOpen && <PharmModal item={selectedItem} onClose={closeModal} />}
    </div>
  );
}
