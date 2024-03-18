import React from 'react' 
import "./index.css";
import styled from 'styled-components';

const Number = ({ symbol, handleClick }) => {
  return (
    <NumberDiv
    style={{outline: 'none'}}
      onClick={() => handleClick(symbol)}
    >
      {symbol}
    </NumberDiv>
  );
}

export default Number;

const NumberDiv = styled.button`
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4d4d4f;  
  border: 1px solid black;
`;