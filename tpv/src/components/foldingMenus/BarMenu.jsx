import React, {useState, useEffect, useContext} from 'react'
import { motion } from 'framer-motion'
import styled from "styled-components"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import {MenuSection, MenuHeader, MenuTitle, MenuTitleTop, item, Times, Popover, Header, IconRow, Cross,
Check} from "../index.jsx"
import { TableState } from '../../context/TableContext.jsx';
import { db, v9db } from "../../components/firebase.jsx";
import { firebaseApp } from '../../components/firebase.jsx';
import {  getFirestore, setDoc,  updateDoc, doc, collection, addDoc, deleteDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { setProducts } from "../../redux/actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import axios, { all } from "axios"
import SetActionMenu from './SetActionMenu.jsx';
import { CartContext, ResetProductContext } from "../../context/contexts.jsx"


const BarMenu = ({setBarMenuOpen, barMenuOpen, productsMenu, setProductsMenu, setActionMenu, actionMenu}) => {

    const [bills, setBills] = useState([]);
    const [allTables, setAllTables] = useState([]);
    const {selectedTable, setSelectedTable} = TableState();
    const [billMenuOpen, setBillMenuOpen] = useState(false);
    const {tableEmpty, setTableEmpty} = TableState(); 
    const [barData, setBarData] = useState([]);
    const dispatch = useDispatch();
    const {cart, setCart} = useContext(CartContext);
    
    console.log(cart);

    const getBills = async () => {
      const snapshot = await firebase.firestore().collection('cuentas').get()
      if(snapshot){
        snapshot.forEach((doc) => {
          const res = (doc.data());
          if(res[0].producto === ""){
            document.getElementById(doc.id).classList.remove("inactive");
            document.getElementById(doc.id).classList.add("active");
          }
        })
      } else {
        console.log("No such document!");
      }
    }

    useEffect(() => {
      getBills();
    }, []);

    const closeMenu = () => {
        setBarMenuOpen(!barMenuOpen);
        setProductsMenu(false);
    }


    

  const Openpop = async (el) => {
    setSelectedTable(el.target.id);
    setBarMenuOpen(!barMenuOpen);
    setActionMenu(!actionMenu);
    const checkRef = db.collection('cuentas').doc(el.target.id);
    const doc = await checkRef.get();
    const res = (doc.data());
    if(res[0].producto !== ""){
      setCart(res);
    }
    //setCart(doc.data());
    /* const checkRef = db.collection('cuentas').doc(el.target.id);
    const doc = await checkRef.get();
    if (!doc.exists) {
      if(cart.cartItems.length === 0){
        dispatch(clearCart());
        dispatch(getTotals());
        setTableEmpty(true);
        setAddProducts(true);
      }
    } else {
      (doc.data().cartItems.forEach((el) => {
        if(cart.cartItems.length === 0){
          dispatch(addToCart(el));
          dispatch(getTotals());
          
          setAddProducts(true);
        } else {
          dispatch(clearCart());
          dispatch(getTotals());
          dispatch(addToCart(el));
          dispatch(getTotals());
          
          setAddProducts(true);
        }
      }));
    } */
  }
  return (
    <motion.div className="menu-container-four" variants={item}
          initial={{width:0,opacity:0, x: "25vw"}}
          animate={{width:"75vw", opacity:1}}
          transition={{duration:.5}}
          exit="exit">
            <MenuSection>
            <MenuHeader>
                <Times onClick={closeMenu}><HighlightOffIcon /></Times>  
            </MenuHeader>
            <MenuTitleTop>BARRA</MenuTitleTop>
            <MenuTitle>SELECCIONA UNA MESA</MenuTitle>
            <Tables >
                <Table className="inactive" id="b1" onClick={(el) => {Openpop(el)}}>B1</Table>
                <Table className="inactive" id="b2" onClick={(el) => {Openpop(el)}}>B2</Table>
                <Table className="inactive" id="b3" onClick={(el) => {Openpop(el)}}>B3</Table>
                <Table className="inactive" id="b4" onClick={(el) => {Openpop(el)}}>B4</Table>
                <Table className="inactive" id="b5" onClick={(el) => {Openpop(el)}}>B5</Table>
                <Table className="inactive" id="b6" onClick={(el) => {Openpop(el)}}>B6</Table>
                <Table className="inactive" id="b7" onClick={(el) => {Openpop(el)}}>B7</Table>
                <Table className="inactive" id="b8" onClick={(el) => {Openpop(el)}}>B8</Table>
            </Tables>
            </MenuSection>
          </motion.div>
  )
}

export default BarMenu




const IconBack = styled(IconButton)`
    &&&{
        transform: scale(1.6);
        background: grey;
    }
`;





const Tables = styled.div`
    width: 95%;
    height: 175px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    place-items: center;
    
    
`;

const Table = styled.div`
    height: 120px;
    width: 100px;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    
    /* border: 1px solid red;
    border: ${({ selectedTable }) => (selectedTable ? "1px solid blue" : "1px solid red")}; */
    margin: 0 5px;
    display: grid;
    place-items: center;
`;

 
