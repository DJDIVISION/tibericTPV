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
import { message, Modal, Button as ButtonTwo } from 'antd'

const SplitMenu = ({splitMenu, setSplitMenu, setBarMenuOpen, barMenuOpen, splitTable, setSplitTable, setTableSettings, tableSettings}) => {

    const {selectedTable, setSelectedTable} = TableState();
    const {tableToSplit, setTableToSplit} = TableState();
    const {cart, setCart} = useContext(CartContext);
    const {newCart, setNewCart} = useContext(NewCartContext);
    const {tableToTransfer, setTableToTransfer} = TableState();
    const [open, setOpen] = useState(false);
    const [qty, setQty] = useState(0);
    const [productToSend, setProductToSend] = useState([]);
    

    
    const closeMenu = () => {
        setSplitMenu(!splitMenu);
    }

    function removeProductInCart ({productInCart, index}) {
        const nextCart = Object.values(cart);
        const id = productInCart.id
        const indice = nextCart.findIndex(obj => obj.id === id);
        const indicedos = newCart.findIndex(obj => obj.id === id);
        console.log(indice);
        console.log("indicedos", indicedos);
        if(indice !== -1 && indicedos === -1){
            if(productInCart.cantidad === 1){
                const elemento = nextCart[indice];
                console.log(elemento);
                nextCart.splice(indice, 1);
                setCart(nextCart)
                newCart.splice(indice, 0, elemento);
                setNewCart(newCart)
            } else {
                const elemento = nextCart[indice];
                console.log(elemento)
                const nuevoElementoOrigen = { ...elemento, cantidad: elemento.cantidad - 1 };
                const nuevoElementoDestino = { ...elemento, cantidad: 1 };
                const nuevoArrayOrigen = [...nextCart.slice(0, indice), nuevoElementoOrigen, ...nextCart.slice(indice + 1)];
                const nuevoArrayDestino = [...newCart, nuevoElementoDestino];
                setCart(nuevoArrayOrigen)
                setNewCart(nuevoArrayDestino)
            }
        } else {
            if(productInCart.cantidad > 1){
                const elemento = nextCart[indice];
                const qty1 = elemento.cantidad - 1
                console.log(elemento)
                console.log(qty1)
                elemento.cantidad = qty1;
                const elementodos = newCart.filter(el => el.id === elemento.id);
                console.log(elementodos)
                const qty2 = elementodos[0].cantidad + 1
                elementodos[0].cantidad = qty2
                console.log(qty2)
                setCart(nextCart)
                setNewCart(newCart)
            } else {
                const elemento = nextCart[indice];
                console.log(elemento);
                nextCart.splice(indice, 1);
                console.log(nextCart);
                const elementodos = newCart.filter(el => el.id === elemento.id);
                console.log(elementodos)
                elementodos[0].cantidad = elementodos[0].cantidad + 1;
                setCart(nextCart)
                setNewCart(newCart)
            }
        }
    }


    const restoreProductInCart = (productInCart) => {

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
          setTableToTransfer("");
          setSplitTable(false);
          setTableSettings(!tableSettings);
          setNewCart([])
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

    const handleOk = () => {
        
      };

      const handleCancel = () => {
        setOpen(false);
      };

      const setValue = (numero) => {
        console.log(numero);
        productToSend.cantidad = numero;
        console.log(productToSend);
        const nextCart = [...Object.values(cart)];
        const filter1 = nextCart.filter(el => el.id === productToSend.id);
        const filter2 = nextCart.filter(el => el.id !== productToSend.id); 
        const newFilter = JSON.parse(JSON.stringify(filter1));
        console.log(newFilter[0]);
        filter1[0].cantidad = qty - numero;
        console.log(filter1[0]);
        const cartItems = [
            filter1[0],
            ...filter2
        ]
        const newCartItems = [
            newFilter[0],
            ...newCart 
        ]
        setCart(cartItems);
        setNewCart(newCartItems);
        setOpen(false);
      }

      function Botones({ cantidad }) {
        // Crear un array con números del 1 al 'cantidad'
        const numeros = Array.from({ length: qty }, (_, index) => index + 1);
      
        return (
          <div>
            {/* Mapear el array 'numeros' y generar un botón para cada número */}
            {numeros.map(numero => (
              <MyButton key={numero} onClick={(el) => setValue(numero)}>{numero}</MyButton>
            ))}
          </div>
        );
      }

      const showModal = (productInCart) => {
        setOpen(true);
        setQty(productInCart.cantidad);
        setProductToSend(productInCart);
        Botones(qty);
          
      };

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
                        {Object.values(cart).map((productInCart, index) => {
                            return(
                                <Product key={productInCart.id}>
                                    <Image style={{backgroundImage: `url(${productInCart.imagen})`, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', backgroundPosition: 'center'}}></Image>
                                    <Name><h4>{productInCart.producto}</h4></Name>
                                    <Price></Price>
                                    <Price><h4>X{productInCart.cantidad}</h4></Price>
                                    <Price><h4>{(productInCart.cantidad * productInCart.precio).toFixed(2)}€</h4></Price>
                                    <IconButton onClick={() => removeProductInCart({productInCart, index})}><ForwardIcon /></IconButton>
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
                                    <IconButton onClick={() => restoreProductInCart(productInCart)}><ReverseIcon /></IconButton>
                                    <Image style={{backgroundImage: `url(${productInCart.imagen})`, backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover', backgroundPosition: 'center'}}></Image>
                                    <Name><h4>{productInCart.producto}</h4></Name>
                                    <Price></Price>
                                    <Price><h4>X{productInCart.cantidad}</h4></Price>
                                    <Price><h4>{(productInCart.cantidad * productInCart.precio).toFixed(2)}€</h4></Price>
                                    
                                </Product>
                            )
                        })}
                    </SplitCart>
                </SplitColumns>
            </div>
            <Button onClick={() => sendCart()} sx={{marginTop: '40px'}} color="success" variant="contained" startIcon={<SendIcon />}>ENVIAR</Button>
            <Modal
                open={open}
                title="Selecciona la cantidad a enviar"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Botones cantidad={qty} />
                ]}
            >
            </Modal>
        </Billpop>
    </motion.div>
  )
}

export default SplitMenu

const MyButton = styled(ButtonTwo)`
    width: 75px;
    margin: 0 5px;
`;

const ReverseIcon = styled(ForwardIcon)`
    transform: rotate(180deg);
`;

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
