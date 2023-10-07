import React, { useState } from 'react';
import axios from 'axios';
import '../supplies.css';
import Button from './buttons';

export default function SuppliesForm() {
  const [itemName, setNewItem] = useState('');
  const [itemDescription, setDescription] = useState('');
  const [stocksAvailable, setStocks] = useState('');
  const [Supplies, setSuppliesList] = useState([
    {Supplies:''},
  ])

  const handleSuppliesAdd = () => {
    setSuppliesList([...Supplies, {Supplies:''}])

  }
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
      
      axios.post('http://localhost:5000/api/inventory',{
        itemName,
        itemDescription,
        stocksAvailable
      })
      .then(result => console.log(result))
      .catch(err => console.log(err))
    
  };

  return (
    <>
      <form className="create-stocks" onSubmit={onSubmit}>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New Item"
          className="input-supplies"
        />
        <input
          type="text"
          value={itemDescription}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Item Description"
          className="input-supplies"
        />
        <input
          type="text"
          value={stocksAvailable}
          onChange={(e) => setStocks(e.target.value)}
          placeholder="Stocks Available"
          className="input-supplies"
        />
        <Button text={'Add'} type="submit" onClick={handleSuppliesAdd}></Button>
      </form>
    </>
  );
}
