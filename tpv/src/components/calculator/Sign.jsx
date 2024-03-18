import React from 'react' 
import "./index.css";
import styled from 'styled-components';

const Sign = ({ symbol, handleClick }) => {
  return (
    <SignDiv
      onClick={() => handleClick(symbol)}
    >
      {symbol}
    </SignDiv>
  );
}

export default Sign;

const SignDiv = styled.button`
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
  background: #f2a33c;
`;