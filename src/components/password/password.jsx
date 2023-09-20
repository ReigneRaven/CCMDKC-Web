import React from 'react';
import '../password/password.css';

const Password = (props) => {
  const {placeholder} = props
  
    return <input type="Password" placeholder={placeholder} id="password"/>
 
   
};
  
  export default Password;