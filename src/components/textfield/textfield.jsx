import React from 'react';
import '../textfield/textfield.css';

const InputField = (props) => {
  const {placeholder, value, onChange} = props
  
    return <input type="text"
     placeholder={placeholder} 
     id='login-input'
     value = {value}
     onChange={onChange}/>
 
   
};
  
  export default InputField;