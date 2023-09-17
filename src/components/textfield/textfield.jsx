import React from 'react';
import '../textfield/textfield.css';

const InputField = (props) => {
  const {placeholder} = props
  
    return <input type="text" placeholder={placeholder} id='login-input'/>
 
   
};
  
  export default InputField;