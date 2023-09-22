import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterButton = ({text,onClick, preW, postW, preH, postH, fontSize, linkTo}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    width: isHovered ? postW : preW,
    height: isHovered ? postH : preH,
    padding: '10px 20px', // Testo sarà sempre dentro bottone.
    cursor: 'pointer',
    fontSize: isHovered ? '110%' : fontSize, // Adjust the fontSize values as needed
    fontWeight: 'bold',
    color: 'black',
    background: 'white',
    border: '1px solid black',
    boxShadow: isHovered
      ? '20px 5px 0 black, -20px -5px 0 black'
      : '3px 3px 0 black, -3px -3px 0 black, -3px 3px 0 black, 3px -3px 0 black',
    transition: 'box-shadow 0.1s ease-in-out, width 0.1s ease-in-out, height 0.1s ease-in-out, fontSize 0.1s ease-in-out', // Increased transition duration
    borderRadius: '3px',
    outline: 'none',
    textTransform: 'uppercase',
    
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <Link to={linkTo} style={{ textDecoration: 'none' }}>
    <button
      style={buttonStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onBlur={handleHover}
      className="noselect"
      onClick={onClick} // Ensure onClick is used here
    > {text}</button></Link>
  );
  
};

export default RegisterButton;