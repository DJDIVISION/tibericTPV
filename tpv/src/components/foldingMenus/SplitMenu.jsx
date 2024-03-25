import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {motion} from "framer-motion"
import {Billpop, MenuHeader, Times, Product, Name, Price, Image} from "../../components/index"
import HighlightOff from '@mui/icons-material/HighlightOff'
import {item} from '../index'
import { IconButton } from '@mui/material'
import { TableState } from '../../context/TableContext'
import { CartContext } from '../../context/contexts'
import ForwardIcon from '@mui/icons-material/Forward';

const SplitMenu = ({splitMenu, setSplitMenu}) => {

    const {selectedTable, setSelectedTable} = TableState();
    const {tableToSplit, setTableToSplit} = TableState();
    const {cart, setCart} = useContext(CartContext);
    const [newCart, setNewCart] = useState([]);

    console.log(selectedTable);
    console.log(tableToSplit);

    const closeMenu = () => {
        setSplitMenu(!splitMenu);
    }

    const removeProductInCart = (productInCart) => {
        console.log(productInCart);
        
    }

    useEffect(() => {
        console.log(newCart);
    }, [newCart]);

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
                                    <Price><h4>{productInCart.cantidad * productInCart.precio}€</h4></Price>
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
                                    <Price><h4>{productInCart.cantidad * productInCart.precio}€</h4></Price>
                                    <IconButton onClick={() => removeProductInCart(productInCart)}><ForwardIcon /></IconButton>
                                </Product>
                            )
                        })}
                    </SplitCart>
                </SplitColumns>
            </div>
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
