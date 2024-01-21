import React from 'react';
import '../headers/header';

const Head2 = (props) => {
  const { text, id } = props;

  return <h2 id={id}>{text}</h2>;
};

export default Head2;
