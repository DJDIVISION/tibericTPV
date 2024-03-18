import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import { motion, useAnimation } from 'framer-motion'
import {AddRow, ProductsImage, MenuTitleMedium, Header, item, Times, ProductsPopover, PopoverHeader, SendRow, Cross, 
    Check} from "../index.jsx"
import { TableState } from '../../context/TableContext.jsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Add from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'

const AddProductsMenu = ({addProductsMenu, setAddProductsMenu,}) => {

    const {selectedTable, setSelectedTable} = TableState();
    const {tableEmpty, setTableEmpty} = TableState(); 
    const {cart, setCart} = TableState(); 
    const dispatch = useDispatch();

    

  return (
    <motion.div className="menu-container-four" variants={item}
    initial={{opacity:0, height: 0, x: "25vw", y: "-30px"}}
    animate={{ opacity:1, height: "100vh", x: "25vw"}}
    transition={{duration:.5}}
    exit="exit">
        <ProductsPopover>
                  <PopoverHeader>
                  <Times onClick={() => setAddProductsMenu(!addProductsMenu)}><HighlightOffIcon /></Times>
                  </PopoverHeader>
                  <ProductsImage>
                  <Avatar alt="Image" src={productProps.imagen} sx={{ width: 100, height: 100, border: "1px solid #a3a3a3" }} />
                  </ProductsImage>
                  <PopoverHeader><MenuTitleMedium>SELECCIONA LA CANTIDAD</MenuTitleMedium></PopoverHeader>
                  <PopoverHeader><MenuTitleMedium>{/* {productProps.precio * qty} */}€</MenuTitleMedium></PopoverHeader>
                  
                  <AddRow>
                  <Icon><IconButton style={{border: '0.5px solid #858585'}} /* onClick={() => handleDecreaseCart(productProps)} */><HorizontalRuleIcon /></IconButton></Icon>
                  <Quantity>{/* {qty} */}</Quantity>
                  <Icon><IconButton style={{border: '0.5px solid #858585'}} onClick={() => handleIncreaseQtyProduct(productParam)}><AddIcon /></IconButton></Icon>
                  </AddRow>
                  <SendRow>
                        <Button onClick={() => setCart(productProps)}><Send /></Button>
                  </SendRow>
                  </ProductsPopover>
    </motion.div>
  )
}

export default AddProductsMenu