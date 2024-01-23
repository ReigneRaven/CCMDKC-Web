import React, { useState } from 'react';
import axios from 'axios';
import '../supplies.css';
import Button from './buttons';
import Head2 from '../../../components/headers/header';

export default function SuppliesForm() {
  const [itemName, setNewItem] = useState('');
  const [itemDescription, setDescription] = useState('');
  const [stocksAvailable, setStocks] = useState('');
  const [itemPrice, setPrice] = useState('');
  const [itemImg, setImage] = useState(null);

  const [Supplies, setSuppliesList] = useState([
    {Supplies:''},
  ])

  const handleSuppliesAdd = () => {
    setSuppliesList([...Supplies, {Supplies:''}])

  }

  const handleImageChange = (e) => {
    // Update the state with the selected image file
    setImage(e.target.files[0]);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission behavior
      
  //     axios.post('http://localhost:5000/api/inventory',{
  //       itemName,
  //       itemDescription,
  //       stocksAvailable,
  //       itemPrice,
  //       itemImg
  //     })
  //     .then(result => console.log(result))
  //     .catch(err => console.log(err))
    
  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create a FormData object
      const formData = new FormData();
  
      // Append the form data to the FormData object
      formData.append('itemName', itemName);
      formData.append('itemDescription', itemDescription);
      formData.append('stocksAvailable', stocksAvailable);
      formData.append('itemPrice', itemPrice);
      formData.append('itemImg', itemImg); // Append the file
  
      // Make the axios post request with FormData
      const result = await axios.post('http://localhost:5000/api/inventory', formData);
  
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="create-stocks" onSubmit={onSubmit}>
        <Head2 text="Enter a Stock" id="inventory-header"></Head2>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder=" New Item"
          className="input-supplies"
        />
        <input
          type="text"
          value={itemDescription}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=" Item Description"
          className="input-supplies"
        />
        <input
          type="text"
          value={stocksAvailable}
          onChange={(e) => setStocks(e.target.value)}
          placeholder=" Stocks Available"
          className="input-supplies"
        />
        <input
          type="text"
          value={itemPrice}
          onChange={(e) => setPrice(e.target.value)}
          placeholder=" Item Price"
          className="input-supplies"
        />

        {/* Add an input field for image upload */}
        <input
          id='img-upload'
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="input-supplies"
        />
        
        <Button text={'Add'} type="submit" onClick={handleSuppliesAdd}></Button>
      </form>
    </>
  );
}
