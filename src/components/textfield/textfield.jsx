import React, { useState } from 'react';
import '../textfield/textfield.css';

const InputField = (props) => {
  const { placeholder, value, onChange } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <input
      type="text"
      placeholder={focused ? '' : placeholder}
      id="login-input"
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default InputField;
