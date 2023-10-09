import React from 'react';
import '../buttons/button.css'; 

const Button = (props) => {
  const label = props.label
  const onClick = props.onClick
  const color = props.color
  const type = props.type
  const id = props.id
  
    const buttonStyle = {
      backgroundColor: color,
    };
  
    return (
      <button className="custom-button" style={buttonStyle} onClick={onClick} type={type} id={id}>
        {label}
      </button>
    );
  };
  
  export default Button;