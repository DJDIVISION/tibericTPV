import React from 'react'
import styled from 'styled-components';
import { useContext, useState, useEffect } from "react";
import { CartContext, ResetProductContext } from "../../context/contexts.jsx";
import { Avatar, IconButton } from '@mui/material';
import { TableState } from '../../context/TableContext.jsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Product, Image, Name, Price} from "../../components/index.jsx";
import { message } from 'antd';
import axios from "axios"
import { sleep } from "./helpers.js"
import { useDispatch, useSelector } from "react-redux";

export default function ProductsCart() {

    const {setProductToReset} = useContext(ResetProductContext)
    const {cart, setCart} = useContext(CartContext)
    const {selectedTable, setSelectedTable} = TableState();
    const [openDelete, setOpenDelete] = useState(false);
    //let [cartHasBeenModified, setCartHasBeenModified] = useState(false);
    const dispatch = useDispatch();
    
    
    function removeProductInCart(productParam) {
        setCart(cart.filter(product => product.id !== productParam.id))
        setProductToReset(productParam)
     }

    function setClick (productParam) {
       /*  console.log(productParam);
        setCurrentIdProduct(productParam.id);
        setOpenDelete(!openDelete); */
    }

    console.log(cart);

  return (
    <Section>
        { cart && Object.values(cart).map((productInCart) => 
                <Product key={productInCart.id} onClick={() => setClick(productInCart)}>
                    <IconButton onClick={() => removeProductInCart(productInCart)}><DeleteForeverIcon /></IconButton><Image style={{backgroundImage: `url(${productInCart.imagen})`, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', backgroundPosition: 'center'}}></Image>
                <Name><h4>{productInCart.producto}</h4></Name>
                <Price></Price>
                <Price><h4>X{productInCart.cantidad}</h4></Price>
                <Price><h4>{productInCart.cantidad * productInCart.precio}€</h4></Price>
                </Product>
            )
        }
    </Section>
  )
}

const Overlay = styled.div`
    width: 20%;
    height: 100%;
    background: red;
    transition: width 1s;
`;

const Section = styled.div`
    width: 100%;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    margin-top: 5px;
`;








