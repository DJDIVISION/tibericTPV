import React from 'react' 
import "./index.css";
import styled from 'styled-components';

const Display = ({ text, result }) => {
  return (
    <DisplayDiv>
      {!result && <h3>{text}</h3>} 
      {result && <h3>{result}</h3>} 
      {/* <div className="result">
        <h3>{result}</h3>
      </div>
      <div className="text">
        <h3>{text}</h3>
      </div> */}
    </DisplayDiv>
  );
};

export default Display;

const DisplayDiv = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid white;
  border-radius: 10px 10px 0 0;
  background: #4d4d4f;
  color: white;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;