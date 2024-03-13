import React, { useState } from 'react';
import axios from 'axios';
import '../supplies.css';
import Button from './buttons';
import Head2 from '../../../components/headers/header';
import DatePicker from 'react-datepicker';

export default function SuppliesForm() {
  const [itemName, setNewItem] = useState('');
  const [itemDescription, setDescription] = useState('');
  const [stocksAvailable, setStocks] = useState('');
  const [itemPrice, setPrice] = useState('');
  const [itemImg, setImage] = useState(null);
  const [expireDate, setExpireDate] = useState(new Date());
  const [Supplies, setSuppliesList] = useState([]);

  const handleImageChange = (e) => {
    // Update the state with the selected image file
    setImage(e.target.files[0]);
    alert('Image successfully uploaded') 
    {/*`````````````````NEW CODE*/}
  };

  const handleExpireDateChange = (expireDate) => {
    setExpireDate(expireDate);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('itemName', itemName);
      formData.append('itemDescription', itemDescription);
      formData.append('stocksAvailable', stocksAvailable);
      formData.append('itemPrice', itemPrice);
      formData.append('expireDate', expireDate);
      formData.append('itemImg', itemImg);

      const result = await axios.post('http://localhost:5000/api/inventory', formData);

      // Update the state with the new stock data
      setSuppliesList([...Supplies, result.data]);

      // Clear the form fields after successful submission
      setNewItem('');
      setDescription('');
      setStocks('');
      setPrice('');
      setImage(null);
      setExpireDate(new Date());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="create-stocks" onSubmit={onSubmit}>
      <div className='form-create-stocks'> {/*NEW CODE*/}
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
        <div className="expiration-container">
          <label htmlFor='expire-date' id='label-expire'>Expiration Date</label>
          <DatePicker
            placeholderText="Expiration Date"
            className="custom-expireDate custom-datepicker"
            selected={expireDate}
            value={expireDate}
            onChange={handleExpireDateChange}
            id="expire-date"
            required
          />
        </div>

        {/* Add an input field for image upload */}
        <input
          id='img-upload'
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="input-supplies"
        />

        <Button text={'Add'} type="submit"></Button>
        </div>
      </form>
    </>
  );
}
