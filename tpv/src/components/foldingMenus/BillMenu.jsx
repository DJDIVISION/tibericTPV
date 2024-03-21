import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import { motion, useAnimation } from 'framer-motion'
import {Billpop, MenuHeader, MenuTitleTop, MenuTitle, BillRow, BillColumn, item, Times, BillIcon, BigButton, BillText, Cross, 
    Euro, Card} from "../index.jsx"
import { TableState } from '../../context/TableContext.jsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { db } from "../../components/firebase.jsx"
import { firebaseApp } from '../../components/firebase.jsx';
import {  getFirestore, setDoc,  updateDoc, doc } from "firebase/firestore";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Add from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import { CartContext, TotalOrderContext } from '../../context/contexts.jsx';
import { message } from 'antd';

const BillMenu = ({billMenu, setBillMenu, actionMenu, setActionMenu, barMenuOpen, setBarMenuOpen}) => {

    const {selectedTable, setSelectedTable} = TableState();
    const {tableEmpty, setTableEmpty} = TableState(); 
    const {cart, setCart} = useContext(CartContext);
    const {totalOrder, setTotalOrder} = useContext(TotalOrderContext)

    const closeMenu = () => {
        setBillMenu(!billMenu);
    }

    const setCash = async () => {
        const payment = "EFECTIVO";
        const date = new Date().toLocaleDateString().toString();
        const time = new Date().toLocaleTimeString().toString();
        const dateMS = new Date().getTime().toString();
        await setDoc(doc(db, "facturas", dateMS), {
            fecha: date, 
            hora: time, 
            importe: totalOrder, 
            mesa: selectedTable, 
            metodoPago: payment,
            productos: {...cart}
        })
        await setDoc(doc(db, "cuentas", selectedTable), {
            0 : {
                producto: "",
                precio: "",
                cantidad: "",
                imagen: "",
                familia: "",
                id: ""
            }
        })
        message.success("Mesa cobrada con éxito!");
        setBillMenu(false);
        setActionMenu(false);
        setBarMenuOpen(false);
        setCart([]);
        setSelectedTable("");
    }

    const setCard = async () => {
        const payment = "TARJETA";
        const date = new Date().toLocaleDateString().toString();
        const time = new Date().toLocaleTimeString().toString();
        const dateMS = new Date().getTime().toString();
        await setDoc(doc(db, "facturas", dateMS), {
            fecha: date, 
            hora: time, 
            importe: totalOrder, 
            mesa: selectedTable, 
            metodoPago: payment,
            productos: {...cart}
        })
        await setDoc(doc(db, "cuentas", selectedTable), {
            0 : {
                producto: "",
                precio: "",
                cantidad: "",
                imagen: "",
                familia: "",
                id: ""
            }
        })
        message.success("Mesa cobrada con éxito!");
        setBillMenu(false);
        setActionMenu(false);
        setBarMenuOpen(false);
        setCart([]);
        setSelectedTable("");
    }

    
    

  return (
    <motion.div className="menu-container-five" variants={item}
    initial={{opacity:0, height: 0, x: "25vw"}}
    animate={{ opacity:1, height: "100vh", x: "25vw"}}
    transition={{duration:.5}}
    exit="exit">
        <Billpop>
        <MenuHeader>
        <Times onClick={closeMenu}><HighlightOffIcon /></Times>
        </MenuHeader>
                <MenuTitleTop>MESA: {selectedTable}</MenuTitleTop>
                <MenuTitle>IMPORTE: {totalOrder}€</MenuTitle>
                <MenuTitle>AÑADE METODO DE PAGO</MenuTitle>
                <BillRow>
                    <BillColumn>
                        <BillIcon>
                        <BigButton onClick={() => setCash()} id="cash"><Euro /></BigButton>
                        </BillIcon>
                        <BillText>EFECTIVO</BillText>
                    </BillColumn>
                    <BillColumn>
                        <BillIcon>
                        <BigButton onClick={() => setCard()} id="card"><Card /></BigButton>
                        </BillIcon>
                        <BillText>TARJETA</BillText>
                    </BillColumn>
                </BillRow>
        </Billpop>
    </motion.div>
  )
}

export default BillMenu