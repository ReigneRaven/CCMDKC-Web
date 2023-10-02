import React, { useState} from 'react';
import '../supplies.css'
import Button from './buttons';
import { useNavigate } from "react-router-dom";
import { useSuppliesContext } from '../../../Hooks/useSuppliesContext';
import Input from './input';
// import axios from 'axios'

export default function SuppliesForm (){
  
  const { dispatch } = useSuppliesContext();
  const navigate = useNavigate();

  const [newItem, setNewItem] = useState('');
  const [description, setDescription] = useState('');
  const [stocks, setStocks] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newItem, description, stocks);

    const supplies = { 
      newItem: newItem,
      description: description,
      stocks: stocks};

    try {
    const response = await fetch('/api/inventory', {
      method: 'POST',
      body: JSON.stringify(supplies),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      
    if (response.ok) {
      const json = await response.json();
      setNewItem("");
      setDescription("");
      setStocks("");
      dispatch({ type: "CREATE_STOCKS", payload: json });
      navigate("/admin/supplies");
    } else {
      console.error('Failed to create supply item:', response.json);
    }
  } catch (error) {
    console.error('Error creating supply item:', error);
  }
};

  
 return (
    <>
     
      <form onSubmit={handleSubmit} className="create-stocks">
        <Input 
        setNewItem={setNewItem} 
        setDescription={setDescription}  
        setStocks={setStocks}
        newItem={newItem}
        description={description}
        stocks={stocks}
        className="input-supplies"/>

        <Button type={'add'} text={"Add"}></Button>
      </form>
   
    </>
  );
};

