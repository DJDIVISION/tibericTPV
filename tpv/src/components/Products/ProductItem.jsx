import React, { useContext, useEffect, useState } from 'react'
import { CartContext, ResetProductContext, TotalOrderContext } from "../../context/contexts.jsx"
import styled from "styled-components"
import { motion, useAnimation } from 'framer-motion'
import {IconRowColumn, ProductsImage, MenuTitleMedium, PopoverHeaderTwo, item, BigRow, ProductsPopover, PopoverHeader, IconRow, Cross, 
    AddDeleteRow, IconRowRow, BestButton, IconRowText, MenuTitleTwo, WhiteCross} from "../index.jsx"
import { TableState } from '../../context/TableContext.jsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import SendIcon from '@mui/icons-material/Send';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../components/firebase.jsx";
import { message } from 'antd'

export default function ProductItem({productProps, productsMenu, setProductsMenu}) {

    const [showOverlay, setShowOverlay] = useState(false)
    const [qty, setQty] = useState(0)
    const {cart, setCart} = useContext(CartContext)
    const {totalOrder, setTotalOrder} = useContext(TotalOrderContext)
    const {productToReset, setProductToReset} = useContext(ResetProductContext);
    const [readyToSend, setReadytoSend] = useState(false);
    const {selectedTable, setSelectedTable} = TableState();
    const {cartModified, setCartModified} = TableState();

    const animation = useAnimation();

    function handleIncreaseQtyProduct(productParam) {
        const nextQty = qty + 1
        setQty(nextQty)
        
        let newCart = [...Object.values(cart)]
        const producIndex = newCart.findIndex((product) => product.id === productParam.id)

        if (producIndex === -1) {
            productParam.cantidad = nextQty
            newCart = [productParam, ...newCart]
        } else {
            newCart[producIndex].cantidad = nextQty 
        }
        
        setCart(newCart)

    }  

    function handleDecreaseQtyProduct(productParam) {
        if (qty > 0) {
            const prevQty = qty - 1
            setQty(prevQty)
            const newCart = [...Object.values(cart)]

            const producIndex = newCart.findIndex((product) => product.id === productParam.id)
            // found product with qty 1
            if (qty === 1 && producIndex !== -1 ) {
                // remove product
                newCart.splice(producIndex, 1)
                return setCart(newCart)
            }

            newCart[producIndex].cantidad = prevQty

            setCart(newCart)
        }
    }

    useEffect(() => {
        if(cart){
            Object.values(cart).forEach((productInCart) => {
                if(productInCart.id === productProps.id){
                    setQty(productInCart.cantidad);
                }
            })
        } else {
            setQty(0);
        }
        console.log(productProps);
        
    }, [ cart, productProps])

    console.log(cart);

    const showHide = () => {
        setShowOverlay(!showOverlay); 
    }

    const ClosePop = () => {
        setCart(cart.filter(product => product.id !== productProps.id))
        setShowOverlay(!showOverlay); 
        setCartModified(false);
    }

    const sendCart = async (productProps) => {
        console.log(cart);
        await setDoc(doc(db, "cuentas", selectedTable), {
            ...cart
          });
        message.success("Mesa guardada con éxito!");
        setCart(cart.filter(product => product.id === selectedTable));
        setShowOverlay(!showOverlay);
        setProductsMenu(!productsMenu);
        setTotalOrder(0);
        setSelectedTable("");
        setCartModified(false);
    }

    const addMore = () => {
        setShowOverlay(!showOverlay);
        setCartModified(true);
    }

  return (
    <>
    <Overlayer>
            <Card animate={{opacity: 1}}
                    initial={{opacity: 0}}
                    exit={{opacity: 0}}
                    onClick={() => setShowOverlay(!showOverlay)}
                    whileTap={{scale: 0.975}}
                    key={productProps.id}
                    
                    >
                        <Picture style={{backgroundImage: `url(${productProps.imagen})`, backgroundPosition: "center",
                    backgroundSize: 'cover', backgroundRepeat: "no-repeat"}}></Picture>
                        <Text>{productProps.producto}</Text>
                        <Text style={{fontSize: "14px"}}>{productProps.precio}€</Text>
            </Card>
    </Overlayer>
    {showOverlay && (
               <motion.div className="menu-container-five" variants={item}
               initial={{opacity:0, height: 0,  }}
               animate={{ opacity:1, height: "100vh",  }}
               transition={{duration:.5}}
               exit="exit">
                <ProductsPopover>
                  
                  <ProductsImage>
                  <Avatar alt="Image" src={productProps.imagen} sx={{ width: 100, height: 100, border: "1px solid #a3a3a3" }} />
                  </ProductsImage>
                  <PopoverHeaderTwo><MenuTitleMedium>SELECCIONA LA CANTIDAD</MenuTitleMedium></PopoverHeaderTwo>
                  <PopoverHeaderTwo><MenuTitleMedium>{productProps.precio * qty}€</MenuTitleMedium></PopoverHeaderTwo>
                  
                  <AddDeleteRow>
                  <Icon><IconButton style={{border: '0.5px solid #858585'}} onClick={() => handleDecreaseQtyProduct(productProps)}><HorizontalRuleIcon /></IconButton></Icon>
                  <Quantity>{qty}</Quantity>
                  <Icon><IconButton style={{border: '0.5px solid #858585'}} onClick={() => handleIncreaseQtyProduct(productProps)}><AddIcon /></IconButton></Icon>
                  </AddDeleteRow>
                  <BigRow>
                    <IconRowColumn>
                        <IconRowRow>
                        <motion.div whileTap={{scale: 0.95}}><BestButton onClick={() => ClosePop(productProps)}><WhiteCross /></BestButton></motion.div>
                        </IconRowRow>
                        <IconRowText><MenuTitleTwo><h3>ELIMINAR PRODUCTO</h3></MenuTitleTwo></IconRowText>
                    </IconRowColumn>
                    <IconRowColumn>
                        <IconRowRow>
                        <motion.div whileTap={{scale: 0.95}}><BestButton onClick={() => addMore(productProps)}><Add /></BestButton></motion.div>
                        </IconRowRow>
                        <IconRowText><MenuTitleTwo><h3>MÁS PRODUCTOS</h3></MenuTitleTwo></IconRowText>
                    </IconRowColumn>
                    <IconRowColumn>
                        <IconRowRow>
                        <motion.div whileTap={{scale: 0.95}}><BestButton onClick={() => sendCart(productProps)}><Send /></BestButton></motion.div>
                        </IconRowRow>
                        <IconRowText><MenuTitleTwo><h3>ENVIAR</h3></MenuTitleTwo></IconRowText>
                    </IconRowColumn>
                  </BigRow>
                  </ProductsPopover>
              </motion.div>
            )}
    </>
        /* { <div className="h-40 w-full bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${productProps.urlImage})`}}  alt="burger-asiatique"></div>
                <div className="flex items-center">
                    <span className="text-sm">{productProps.name} |</span>
                    <span className="ml-2 text-stone-400 text-[10px]">{productProps.note}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-bold">{`${productProps.devise} ${productProps.price}`} </span>
                    <span className="text-[10px]">{productProps.available} item(s)</span>
                </div>
                <div className={`flex flex-col space-y-8 bg-[#f05756]/90 absolute left-0 ${showOverlay ? 'h-4/5 opacity-100' : ' h-0 opacity-0 z-[-2]'} delay-500 duration-300 transition-all ease-in-out bottom-0 w-full rounded-lg p-2`}>
                    <span className="text-xl">{productProps.name} </span>
                    <span className="font-bold text-2xl">{`${productProps.devise} ${productProps.price * cantidad}`}</span>
                    <div className="flex justify-center space-x-8 items-center">
                        <div onClick={() => handleDecreasecantidadProduct(productProps)} className="flex items-center justify-center h-10 w-10 rounded-xl border border-white bg-white text-stone-700 hover:opacity-60 transition">-</div>
                        <span className="text-4xl">{cantidad}</span>
                        <div onClick={() => handleIncreasecantidadProduct(productProps)} className="flex items-center justify-center h-10 w-10 rounded-xl border border-white bg-white text-stone-700 hover:opacity-60 transition">+</div>
                    </div>
                </div> }*/
    
  )
}

const Send = styled(SendIcon)`
&&&{
    color: ${({ readyToSend }) => (readyToSend ? "#4cbb17" : "#a3a3a3")};
}
`;

const Add = styled(PlaylistAddIcon)`
&&&{
    color: ${({ readyToSend }) => (readyToSend ? "#4cbb17" : "#a3a3a3")};
}
`;

const Icon = styled.div`
    width: 40%;
    height: 100%;
    display: grid;
    place-items: center;
`;

const Quantity = styled.div`
    width: 20%;
    height: 100%;
    color: white;
    font-size: 32px;
    display: grid;
    place-items: center;
`;

const Overlayer = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 140px;
`;

const Card = styled(motion.div)`
  width: 200px;
  height: 140px;
  border: 0.5px solid goldenrod;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 5px;
`;

const Overlay = styled(motion.div)`
    width: 100%;
    height: 70%;
    position: absolute;
    background: #666666;
    left: 0;
    top: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const Picture = styled.div`
    width: 95%;
    height: 60%;
    display: grid;
    place-items: center;
    border-radius: 5px;
`;

const Text = styled.div`
    height: 20%;
    width: 95%;
    transform: translateY(5px);
    white-space: nowrap;
    overflow:hidden !important;
    text-overflow: ellipsis;
    text-align: center;
    h1{
        color: white;
        font-size: 12px;
        
    }
`;
