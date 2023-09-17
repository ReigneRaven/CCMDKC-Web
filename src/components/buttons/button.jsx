import React from 'react';
import '../buttons/button.css'; 

const Button = (props) => {
  const label = props.label
  const onClick = props.onClick
  const color = props.color
  
    const buttonStyle = {
      backgroundColor: color,
    };
  
    return (
      <button className="custom-button" style={buttonStyle} onClick={onClick}>
        {label}
      </button>
    );
  };
  
  export default Button;