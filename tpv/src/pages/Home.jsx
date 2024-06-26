import React, { useEffect, useState, useContext, useMemo } from "react";
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import { TableState } from "../context/TableContext.jsx";
import { CartContext, ResetProductContext, TotalOrderContext } from "../context/contexts.jsx"
import styled from 'styled-components'
import {motion} from "framer-motion"
import { Button, IconButton } from "@mui/material";
import HighlightOff from "@mui/icons-material/HighlightOff.js";
import { message } from "antd";
import NavBar from '../components/NavBar'
import {animationTwo, transitionTwo} from '../animations'
import { HomeSection, LeftColumn, BigHalf, RightColumn, HalfColumn, BillDisplay, BillWrapper, BillDisplaySmall,
  BillDisplayBig, BillPrice, BillButtons, LinkIcon, TableSettingsIcon, TransferTitle, MyButton, Billpop, item,
  SmallMenuHeader } from '../components'
import Calculator from '../components/calculator/Calculator'
import ProductsFilter from '../components/Products/ProductsFilter.jsx';
import BarMenu from "../components/foldingMenus/BarMenu.jsx";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SendIcon from '@mui/icons-material/Send';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { db } from "../components/firebase.jsx"
import { firebaseApp } from '../components/firebase.jsx';
import {  getFirestore, setDoc,  updateDoc, doc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import ProductsCart from "../components/Products/ProductsCart.jsx";
import SetActionMenu from "../components/foldingMenus/SetActionMenu.jsx";
import AddProductsMenu from "../components/foldingMenus/AddProductsMenu.jsx";
import BillMenu from "../components/foldingMenus/BillMenu.jsx";
import TableSettings from "../components/foldingMenus/TableSettings.jsx";
import SplitMenu from "../components/foldingMenus/SplitMenu.jsx";
import RoomMenu from "../components/foldingMenus/RoomMenu.jsx";



export default function Home() {

  const [tableSettings, setTableSettings] = useState(false);
  const [barMenuOpen, setBarMenuOpen] = useState(false);
  const [roomMenuOpen, setRoomMenuOpen] = useState(false);
  const [terraceMenuOpen, setTerraceMenuOpen] = useState(false);
  const [productsMenu, setProductsMenu] = useState(false);
  const [billMenu, setBillMenu] = useState(false);
  const [splitMenu, setSplitMenu] = useState(false);
  const [splitTable, setSplitTable] = useState(false);
  const [transferTable, setTransferTable] = useState(false);
  const {tableToTransfer, setTableToTransfer} = TableState();
  const [addProductsMenu, setAddProductsMenu] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [actionMenu, setActionMenu] = useState(false);
  const {selectedTable, setSelectedTable} = TableState();
  const {cartModified, setCartModified} = TableState();
  const {tableToSplit, setTableToSplit} = TableState();
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const {cart, setCart} = useContext(CartContext);
  const {totalOrder, setTotalOrder} = useContext(TotalOrderContext);

  const setBar = async () => {
    setBarMenuOpen(true);
    setActionMenu(false);
    setTableToTransfer(selectedTable);
}
  

  const fetchProducts = async () => {
    const snapshot = await firebase.firestore().collection('productos').get()
    dispatch(setProducts(snapshot.docs.map(doc => doc.data())));
  };

  useEffect(() => {
    if(cart){
      let total = [];

      Object.values(cart).forEach(el => {
        total.push(el.precio * el.cantidad);
      })

      setTotalOrder(total.reduce((a,b) => a+b, 0).toFixed(2));
      
    }
  })

  useEffect(() => {
    fetchProducts();
  }, []);

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
    setActionMenu(false);
    setProductsMenu(false);
}

const openTableSettings = () => {
  setTableSettings(!tableSettings);
}

const closeTransfer = () => {
  setTransferTable(!transferTable);
  setTableSettings(!tableSettings);
  setBarMenuOpen(false);
  setTotalOrder(0);
  setSelectedTable("");
  setCart([]);
  setTableToSplit("");
  setTableToTransfer("");
  setActionMenu(false);
}

const closeSplit = () => {
  setSplitTable(!splitTable);
  setTableSettings(!tableSettings);
  setBarMenuOpen(false);
  setTotalOrder(0);
  setSelectedTable("");
  setCart([]);
  setTableToSplit("");
  setTableToTransfer("");
  setActionMenu(false);
}


  return (
    <motion.div initial="out" animate="in" variants={animationTwo} transition={transitionTwo}>
      <HomeSection>
        <NavBar />
        <LeftColumn>
          <HalfColumn>
          <Calculator barMenuOpen={barMenuOpen} setBarMenuOpen={setBarMenuOpen} productsMenu={productsMenu} setProductsMenu={setProductsMenu} actionMenu={actionMenu} setActionMenu={setActionMenu}
          roomMenuOpen={roomMenuOpen} setRoomMenuOpen={setRoomMenuOpen} terraceMenuOpen={terraceMenuOpen} setTerraceMenuOpen={setTerraceMenuOpen} splitTable={splitTable} setSplitTable={setSplitTable}
          transferTable={transferTable} setTransferTable={setTransferTable} tableSettings={tableSettings} setTableSettings={setTableSettings}/>
          </HalfColumn>
          <BigHalf>
            <BillDisplay>
              <BillDisplaySmall></BillDisplaySmall>
              <BillDisplayBig id="tableDisplay">MESA: {selectedTable}</BillDisplayBig>
              <BillDisplaySmall>
                {cart.length !== 0 && <LinkIcon onClick={openTableSettings}><TableSettingsIcon /></LinkIcon>}
              </BillDisplaySmall>
            </BillDisplay>
            <BillWrapper id="billwrapper">
              <ProductsCart />
            </BillWrapper>
            <BillPrice onClick={print}>TOTAL: {totalOrder}€</BillPrice>
           
                {/* <Button onClick={() => añadir()} size="small" color="success" variant="contained" startIcon={<AddShoppingCartIcon />}>AÑADIR</Button> */}
                {cartModified && (
                  <BillButtons>
                  <Button onClick={() => sendCart()} size="small" color="success" variant="contained" startIcon={<SendIcon />}>ENVIAR</Button>
                  <Button /* onClick={() => cobrar()} */ size="small" color="success" variant="contained" startIcon={<PointOfSaleIcon />}>COBRAR</Button>
                  </BillButtons>
                )}
            
          </BigHalf>
        </LeftColumn>
        <RightColumn>
        
        </RightColumn>
        
      </HomeSection>
        {barMenuOpen && (
          <BarMenu setBarMenuOpen={setBarMenuOpen} barMenuOpen={barMenuOpen} setProductsMenu={setProductsMenu} productsMenu={productsMenu} setActionMenu={setActionMenu} actionMenu={actionMenu} tableSettings={tableSettings} setTableSettings={setTableSettings} splitMenu={splitMenu} setSplitMenu={setSplitMenu} transferTable={transferTable} setTransferTable={setTransferTable} splitTable={splitTable} setSplitTable={setSplitTable}/>
        )}
        {roomMenuOpen && (
          <RoomMenu roomMenuOpen={roomMenuOpen} setRoomMenuOpen={setRoomMenuOpen} />
        )}
        {productsMenu && (
        <ProductsFilter setProductsMenu={setProductsMenu} productsMenu={productsMenu} showOverlay={showOverlay} setShowOverlay={setShowOverlay}/>
        )}
        {actionMenu && (
          <SetActionMenu setTableSettings={setTableSettings} actionMenu={actionMenu} setActionMenu={setActionMenu} billMenu={billMenu} setBillMenu={setBillMenu} setProductsMenu={setProductsMenu} productsMenu={productsMenu} barMenuOpen={barMenuOpen} setBarMenuOpen={setBarMenuOpen}/>
        )}
        {billMenu && (
          <BillMenu billMenu={billMenu} setBillMenu={setBillMenu} setBarMenuOpen={setBarMenuOpen} barMenuOpen={barMenuOpen} actionMenu={actionMenu} setActionMenu={setActionMenu}/>
        )}
        {tableSettings && (
          <TableSettings tableSettings={tableSettings} setTableSettings={setTableSettings} setBarMenuOpen={setBarMenuOpen} barMenuOpen={barMenuOpen} actionMenu={actionMenu} setActionMenu={setActionMenu} splitTable={splitTable} setSplitTable={setSplitTable} transferTable={transferTable} setTransferTable={setTransferTable}/>
        )}
        {splitMenu && (
          <SplitMenu splitMenu={splitMenu} setSplitMenu={setSplitMenu} setBarMenuOpen={setBarMenuOpen} barMenuOpen={barMenuOpen} actionMenu={actionMenu} setActionMenu={setActionMenu} splitTable={splitTable} setSplitTable={setSplitTable} setTableSettings={setTableSettings} tableSettings={tableSettings}/>
        )}
        {transferTable && (
          <motion.div className="menu-container-seven" variants={item}
          initial={{width:0,opacity:0}}
          animate={{width:"25VW", opacity:1}}
          transition={{duration:.5}}
          exit="exit">
                <Billpop>
                <SmallMenuHeader>
                <IconButton style={{transform: "scale(1.2)"}} onClick={closeTransfer}><HighlightOff style={{color: "white"}}/></IconButton>
                </SmallMenuHeader>
                <BillDisplay>
                    <BillDisplaySmall></BillDisplaySmall>
                    <BillDisplayBig id="tableDisplay">MESA: {selectedTable}</BillDisplayBig>
                    <BillDisplaySmall></BillDisplaySmall>
                </BillDisplay>
                <TransferTitle>SELECCIONA MESA DESTINO</TransferTitle>
                <div style={{display: 'flex'}}>
                    <MyButton onClick={setBar}>BARRA</MyButton>
                    <MyButton>SALA</MyButton>
                    <MyButton>TERRAZA</MyButton>
                </div>
                </Billpop>
                </motion.div>
            )}
            {splitTable && (
              <motion.div className="menu-container-seven" variants={item}
              initial={{width:0,opacity:0}}
              animate={{width:"25VW", opacity:1}}
              transition={{duration:.5}}
              exit="exit">
                <Billpop>
                <SmallMenuHeader>
                <IconButton style={{transform: "scale(1.2)"}} onClick={closeSplit}><HighlightOff style={{color: "white"}}/></IconButton>
                </SmallMenuHeader>
                <BillDisplay>
                    <BillDisplaySmall></BillDisplaySmall>
                    <BillDisplayBig id="tableDisplay">MESA: {tableToSplit}</BillDisplayBig>
                    <BillDisplaySmall></BillDisplaySmall>
                </BillDisplay>
                <TransferTitle>SELECCIONA MESA DESTINO</TransferTitle>
                <div style={{display: 'flex'}}>
                    <MyButton onClick={setBar}>BARRA</MyButton>
                    <MyButton>SALA</MyButton>
                    <MyButton>TERRAZA</MyButton>
                </div>
                </Billpop>
                </motion.div>
            )}
    </motion.div>
  )
}

const BillButton = styled(Button)`
  background: blue;
`;
