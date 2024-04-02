import React, {useState, useContext} from 'react'
import { Numbers, CalculatorWrapper, HalfColumn, Column, CalculatorIcon, BarIcon, AddTableIcon, TerraceIcon,
    CalcIconColumn } from '../../components'
import { IconButton } from '@mui/material';
import Display from './Display';
import Number from './Number';
import Sign from './Sign';
import * as math from "mathjs";
import { message } from 'antd';
import { TableState } from '../../context/TableContext.jsx';
import { CartContext, ResetProductContext, TotalOrderContext } from "../../context/contexts.jsx"


export default function Calculator({barMenuOpen, setBarMenuOpen, productsMenu, setProductsMenu, roomMenuOpen, setRoomMenuOpen, terraceMenuOpen, setTerraceMenuOpen, actionMenu, setActionMenu,
transferTable, setTransferTable, splitTable, setSplitTable, tableSettings, setTableSettings}) {

    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    const {selectedTable, setSelectedTable} = TableState();
    const {cart, setCart} = useContext(CartContext);
    const {totalOrder, setTotalOrder} = useContext(TotalOrderContext);
    

    const setSelectedData = (data) => {
        if(data.length > 0){
            
            console.log(data);
          
        } else {
          
          message.warning("Esta mesa está vacía!");
        }
      }

    const setBar = () => {
        if(!text){
          setSelectedTable("");
          setBarMenuOpen(!barMenuOpen);
          setRoomMenuOpen(false)
          setTerraceMenuOpen(false);
        } else {
          const input = parseInt(text.join(""));
          if(input > 8){
            message.error("No existe esta mesa. Selecciona otra!");
          } else if(input <= 8){
            const table = "b"+input;
            setSelectedTable(table);
            fetch('http://localhost:8000/api/bills/' + table)
            .then(res => res.json())
            .then(data => setSelectedData(data))
            .catch(err => console.log(err));
              }
            setText("");
        }
      }
    
    const setRoom = () => {
        if(!text){
            setRoomMenuOpen(!roomMenuOpen);
            setBarMenuOpen(false);
            setTerraceMenuOpen(false);
        } else {
            const input = parseInt(text.join(""));
            if(input > 24){
            message.error("No existe esta mesa. Selecciona otra!");
            } else if(input <= 24){
            const table = "s"+input;
            setSelectedTable(table);
            fetch(`http://localhost:8000/api/bills/${table}`)
            .then(res => res.json())
            .then(data => setSelectedData(data))
            .catch(err => console.log(err));
                }
            setText("");
        }
      }
    
    const setTerrace = () => {
        if(!text){
            setTerraceMenuOpen(!terraceMenuOpen);
            setBarMenuOpen(false);
            setRoomMenuOpen(false)
        } else {
            const input = parseInt(text.join(""));
            if(input > 14){
            message.error("No existe esta mesa. Selecciona otra!");
            } else if(input <= 14){
            const table = "t"+input;
            setSelectedTable(table);
            fetch(`http://localhost:8000/api/bills/${table}`)
            .then(res => res.json())
            .then(data => setSelectedData(data))
            .catch(err => console.log(err));
                }
            setText("");
        }
    }

    const addToText = (val) => {
        setText((text) => [...text, val + ""]);
    };
    
    const resetInput = () => {
        setText("");
        setResult("");
        setSelectedTable("");
        setProductsMenu(false);
        setCart([]);
        setTotalOrder(0);
        setActionMenu(false);
        setTableSettings(false);
        setTransferTable(false);
        setSplitTable(false);
    };
    
    const calculateResult = () => {
        const input = text.join(""); // Remove commas
        //alert(input);
        setResult(math.evaluate(input));
    };

  return (
    <>
        <Column>
            
        </Column>
        <CalculatorWrapper>
            <Display text={text} result={result} />
            <Numbers>
                <Sign symbol="+" handleClick={addToText}></Sign>
                <Number symbol="7" handleClick={addToText}></Number>
                <Number symbol="8" handleClick={addToText}></Number>
                <Number symbol="9" handleClick={addToText}></Number>
                <Sign symbol="-" handleClick={addToText}></Sign>
                <Number symbol="4" handleClick={addToText}></Number>
                <Number symbol="5" handleClick={addToText}></Number>
                <Number symbol="6" handleClick={addToText}></Number>
                <Sign symbol="*" handleClick={addToText}></Sign>
                <Number symbol="1" handleClick={addToText}></Number>
                <Number symbol="2" handleClick={addToText}></Number>
                <Number symbol="3" handleClick={addToText}></Number>
                <Sign symbol="C" handleClick={resetInput}></Sign>
                <Number symbol="0" handleClick={addToText}></Number>
                <Number symbol="." handleClick={addToText}></Number>
                <Number symbol="=" handleClick={calculateResult}>=</Number>
            </Numbers>
        </CalculatorWrapper>
        <CalcIconColumn>
        <CalculatorIcon><IconButton style={{outline: 'none'}} onClick={setBar}><BarIcon /></IconButton></CalculatorIcon>
            <CalculatorIcon><IconButton style={{outline: 'none'}} onClick={setRoom}><AddTableIcon /></IconButton></CalculatorIcon>
        <CalculatorIcon><IconButton style={{outline: 'none'}} onClick={setTerrace}><TerraceIcon /></IconButton></CalculatorIcon>
        </CalcIconColumn>
        
    </>
  )
}
