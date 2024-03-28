import React, {useContext, useState, useEffect} from 'react'
import styled from 'styled-components'
import {motion} from "framer-motion"
import {Billpop, MenuHeader, Times, Product, Name, Price, Image} from "../../components/index"
import HighlightOff from '@mui/icons-material/HighlightOff'
import {item} from '../index'
import { IconButton, Button } from '@mui/material'
import { TableState } from '../../context/TableContext'
import { CartContext, NewCartContext } from '../../context/contexts'
import ForwardIcon from '@mui/icons-material/Forward';
import SendIcon from '@mui/icons-material/Send';
import { db } from "../../components/firebase.jsx";
import { setDoc, doc } from "firebase/firestore";
import { message } from 'antd'

const SplitMenu = ({splitMenu, setSplitMenu, setBarMenuOpen, barMenuOpen, splitTable, setSplitTable, setTableSettings, tableSettings}) => {

    const {selectedTable, setSelectedTable} = TableState();
    const {tableToSplit, setTableToSplit} = TableState();
    const {cart, setCart} = useContext(CartContext);
    const {newCart, setNewCart} = useContext(NewCartContext);
    


    const closeMenu = () => {
        setSplitMenu(!splitMenu);
    }

    const removeProductInCart = (productInCart) => {
        const nextCart = [...Object.values(cart)];
        const filter1 = nextCart.filter(el => el.id === productInCart.id);
        const filter2 = nextCart.filter(el => el.id !== productInCart.id);
        setCart(filter2);
        const newCartItems = [
            filter1[0],
            ...newCart
        ]
        setNewCart(newCartItems);
    }


    const sendCart = async () => {
        console.log(cart);
        console.log(newCart);
        console.log(selectedTable);
        console.log(tableToSplit);
        if(cart.length === 0){
            await setDoc(doc(db, "cuentas", tableToSplit), {
                0 : {
                    producto: "",
                    precio: "",
                    cantidad: "",
                    imagen: "",
                    familia: "",
                    id: ""
                }
              }); 
        } else {
            await setDoc(doc(db, "cuentas", tableToSplit), {
                ...cart
              });
        }
        await setDoc(doc(db, "cuentas", selectedTable), {
            ...newCart
          });
          message.success("Mesa separada con éxito!");
          setSplitMenu(false);
          setBarMenuOpen(false);
          setCart([]);
          setSelectedTable("");
          setTableToSplit("");
          setSplitTable(false);
          setTableSettings(!tableSettings);
        /* await setDoc(doc(db, "cuentas", tableToSplit), {
            ...cart
          });
        await setDoc(doc(db, "cuentas", selectedTable), {
          ...newCart
        });
        message.success("Mesa separada con éxito!");
        setSplitMenu(false);
        setBarMenuOpen(false); */
    }

  return (
    <motion.div className="menu-container-eight" variants={item}
    initial={{opacity:0, height: 0, x: "25vw"}}
    animate={{ opacity:1, height: "100vh", x: "25vw"}}
    transition={{duration:.5}}
    exit="exit">
        <Billpop>
             <MenuHeader>
                <Times onClick={closeMenu}><HighlightOff /></Times>
            </MenuHeader>
            <div style={{display: 'flex', width: '100%'}}>
                <SplitColumns>
                    <SplitTable>MESA DE ORIGEN: {tableToSplit}</SplitTable>
                    <SplitCart>
                        {Object.values(cart).map((productInCart) => {
                            return(
                                <Product key={productInCart.id}>
                                    <Image style={{backgroundImage: `url(${productInCart.imagen})`, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', backgroundPosition: 'center'}}></Image>
                                    <Name><h4>{productInCart.producto}</h4></Name>
                                    <Price></Price>
                                    <Price><h4>X{productInCart.cantidad}</h4></Price>
                                    <Price><h4>{(productInCart.cantidad * productInCart.precio).toFixed(2)}€</h4></Price>
                                    <IconButton onClick={() => removeProductInCart(productInCart)}><ForwardIcon /></IconButton>
                                </Product>
                            )
                        })}
                    </SplitCart>
                </SplitColumns>
                <SplitColumns>
                    <SplitTable>MESA DE DESTINO: {selectedTable}</SplitTable>
                    <SplitCart>
                        {newCart && Object.values(newCart).map((productInCart) => {
                            return(
                                <Product key={productInCart.id}>
                                    <Image style={{backgroundImage: `url(${productInCart.imagen})`, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', backgroundPosition: 'center'}}></Image>
                                    <Name><h4>{productInCart.producto}</h4></Name>
                                    <Price></Price>
                                    <Price><h4>X{productInCart.cantidad}</h4></Price>
                                    <Price><h4>{(productInCart.cantidad * productInCart.precio).toFixed(2)}€</h4></Price>
                                    <IconButton onClick={() => removeProductInCart(productInCart)}><ForwardIcon /></IconButton>
                                </Product>
                            )
                        })}
                    </SplitCart>
                </SplitColumns>
            </div>
            <Button onClick={() => sendCart()} sx={{marginTop: '40px'}} color="success" variant="contained" startIcon={<SendIcon />}>ENVIAR</Button>
        </Billpop>
    </motion.div>
  )
}

export default SplitMenu

const SplitColumns = styled.div`
    width: 50%;
    height: 70vh;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SplitTable = styled.div`
    width: 100%;
    height: 10vh;
    display: grid;
    place-items: center;
    color: white;
    font-size: 24px;
    text-transform: uppercase;
`;

const SplitCart = styled.div`
    width: 100%;
    height: 60vh;
    display: grid;
    place-items: center;
`;
