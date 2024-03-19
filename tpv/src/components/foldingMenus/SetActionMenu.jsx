import React, {useContext, useState} from 'react'
import { motion } from 'framer-motion'
import styled from "styled-components"
import {Popover, Header, BigRow, MenuTitle, IconRow, Cross, Check, item, EmptyTableTitle, IconRowColumn,
  IconRowText, IconRowRow, NonEmptyTableTitle, MenuTitleTwo, Euro, Add, WhiteCross, IconRowColumnTwo, BigRowTwo} from "../index"
import { IconButton } from '@mui/material'
import { TableState } from '../../context/TableContext.jsx';
import { CartContext, TotalOrderContext } from '../../context/contexts.jsx'

const SetActionMenu = ({ actionMenu, setActionMenu, setProductsMenu, productsMenu, billMenu, setBillMenu, barMenuOpen, setBarMenuOpen}) => {

    const {selectedTable, setSelectedTable} = TableState();
    const {tableEmpty, setTableEmpty} = TableState(); 
    const {cart, setCart} = useContext(CartContext);
    const {totalOrder, setTotalOrder} = useContext(TotalOrderContext)

    const ClosePop = () => {
        setSelectedTable("");
        setActionMenu(false);
        setBarMenuOpen(false);
        setProductsMenu(false);
        setTableEmpty(false);
        setCart([]);
        setTotalOrder(0);
    }

    const closeMenuAddPop = () => {
        setBarMenuOpen(false);
        setActionMenu(false);
        setProductsMenu(true);
    }

    const openBillMenu = () => {
      setBillMenu(!billMenu);
    }

  return (
                  <motion.div className="menu-container-four" variants={item}
                  initial={{height:0, opacity:0, x: "25vw"}}
                  animate={{height:"100vh", opacity:1, x: "25vw"}}
                  transition={{duration:.5}}
                  exit="exit">
                  <Popover>
                  <Header><h1>MESA: {selectedTable}</h1></Header>
                        <NonEmptyTableTitle>{totalOrder === 0 ? "MESA VACÍA" : totalOrder}{totalOrder === 0 ? "" : "€"}</NonEmptyTableTitle>
                        <BigRow>
                          <IconRowColumn>
                            <IconRowRow>
                            <motion.div whileTap={{scale: 0.95}}><Button onClick={ClosePop}><WhiteCross /></Button></motion.div>
                            </IconRowRow>
                            <IconRowText><MenuTitleTwo><h3>CERRAR</h3></MenuTitleTwo></IconRowText>
                          </IconRowColumn>
                          <IconRowColumn>
                            <IconRowRow>
                            <motion.div whileTap={{scale: 0.95}}><Button onClick={closeMenuAddPop}><Add /></Button></motion.div>
                            </IconRowRow>
                            <IconRowText><MenuTitleTwo><h3>AÑADIR PRODUCTOS</h3></MenuTitleTwo></IconRowText>
                          </IconRowColumn>
                          {totalOrder !== 0 ? <IconRowColumn>
                            <IconRowRow>
                            <motion.div whileTap={{scale: 0.95}}><Button onClick={openBillMenu}><Euro /></Button></motion.div>
                            </IconRowRow>
                            <IconRowText><MenuTitleTwo><h3>COBRAR</h3></MenuTitleTwo></IconRowText>
                          </IconRowColumn> : <></>}
                        </BigRow>
                  </Popover>
              </motion.div>
  )
}

export default SetActionMenu

const Button = styled(IconButton)`
  &&&{
    transform: scale(2.5);
    border: 0.5px solid #a2a2a2;
  }
`;