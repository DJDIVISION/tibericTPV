import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import {motion} from "framer-motion"
import {item, Billpop, SmallMenuHeader, BillDisplay, BillDisplaySmall, BillDisplayBig, MyButton, Times} from "../index"
import { IconButton, Button } from '@mui/material'
import HighlightOff from '@mui/icons-material/HighlightOff'
import MoveUpIcon from '@mui/icons-material/MoveUp';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { TableState } from '../../context/TableContext'
import firebase from 'firebase/compat/app';
import { CartContext } from '../../context/contexts'

const TableSettings = ({tableSettings, setTableSettings, barMenuOpen, setBarMenuOpen, actionMenu, setActionMenu, splitTable, setSplitTable, transferTable, setTransferTable}) => {

    
    const {selectedTable, setSelectedTable} = TableState();
    const {tableToTransfer, setTableToTransfer} = TableState();
    const {tableToSplit, setTableToSplit} = TableState();
    const {cart, setCart} = useContext(CartContext);

    const getBills = async () => {
        const snapshot = await firebase.firestore().collection('cuentas').get()
        if(snapshot){
            const freeTables = [];
          snapshot.forEach((doc) => {
            const res = (doc.data());
            if(res[0].producto === ""){
                freeTables.push(doc.id);
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
        setTableSettings(!tableSettings);
    }

    const setTransfer = () => {
        setTransferTable(true);
        document.getElementById("split").style.display = 'none';
    }

    const setSplit = () => {
        setTableToSplit(selectedTable);
        setSplitTable(true);
        document.getElementById("transfer").style.display = 'none';
    }

    

  return (
    <motion.div className="menu-container-seven" variants={item}
    initial={{width:0,opacity:0}}
    animate={{width:"25VW", opacity:1}}
    transition={{duration:.5}}
    exit="exit">
        <Billpop>
            <SmallMenuHeader>
                <IconButton style={{transform: "scale(1.2)"}} onClick={closeMenu}><HighlightOff style={{color: "white"}}/></IconButton>
            </SmallMenuHeader>
            <div style={{display: 'flex'}}>
            <MyButton startIcon={<MoveUpIcon />} onClick={setTransfer} id="transfer">TRANSFERIR MESA</MyButton>
            <MyButton startIcon={<CallSplitIcon />} id="split" onClick={setSplit}>SEPARAR ARTÍCULOS</MyButton>
            </div>
        </Billpop>
    </motion.div>
  )
}

export default TableSettings


