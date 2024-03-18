import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import { TableState } from "../context/TableContext.jsx";
import { CartContext, ResetProductContext, TotalOrderContext } from "../context/contexts.jsx"
import styled from 'styled-components'
import {motion} from "framer-motion"
import NavBar from '../components/NavBar'
import {animationTwo, transitionTwo} from '../animations'
import { HomeSection, LeftColumn, BigHalf, RightColumn, HalfColumn, BillDisplay, BillWrapper, BillDisplaySmall,
  BillDisplayBig, BillPrice } from '../components'
import Calculator from '../components/calculator/Calculator'
import ProductsFilter from '../components/Products/ProductsFilter.jsx';
import BarMenu from "../components/foldingMenus/BarMenu.jsx";
import { db } from "../components/firebase.jsx"
import { firebaseApp } from '../components/firebase.jsx';
import {  getFirestore, setDoc,  updateDoc, doc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import ProductsCart from "../components/Products/ProductsCart.jsx";
import SetActionMenu from "../components/foldingMenus/SetActionMenu.jsx";
import AddProductsMenu from "../components/foldingMenus/AddProductsMenu.jsx";



export default function Home() {

  const [barMenuOpen, setBarMenuOpen] = useState(false);
  const [roomMenuOpen, setRoomMenuOpen] = useState(false);
  const [terraceMenuOpen, setTerraceMenuOpen] = useState(false);
  const [productsMenu, setProductsMenu] = useState(false);
  const [addProductsMenu, setAddProductsMenu] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [actionMenu, setActionMenu] = useState(false);
  const {selectedTable, setSelectedTable} = TableState();
  const {tableEmpty, setTableEmpty} = TableState();
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const {cart, setCart} = useContext(CartContext);
  const {totalOrder, setTotalOrder} = useContext(TotalOrderContext);

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

      setTotalOrder(total.reduce((a,b) => a+b, 0));
      
    }
  })

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(cart);


  return (
    <motion.div initial="out" animate="in" variants={animationTwo} transition={transitionTwo}>
      <HomeSection>
        <NavBar />
        <LeftColumn>
          <HalfColumn>
          <Calculator barMenuOpen={barMenuOpen} setBarMenuOpen={setBarMenuOpen} productsMenu={productsMenu} setProductsMenu={setProductsMenu} actionMenu={actionMenu} setActionMenu={setActionMenu}
          roomMenuOpen={roomMenuOpen} setRoomMenuOpen={setRoomMenuOpen} terraceMenuOpen={terraceMenuOpen} setTerraceMenuOpen={setTerraceMenuOpen}/>
          </HalfColumn>
          <BigHalf>
            <BillDisplay>
              <BillDisplaySmall></BillDisplaySmall>
              <BillDisplayBig id="tableDisplay">MESA: {selectedTable}</BillDisplayBig>
              <BillDisplaySmall></BillDisplaySmall>
            </BillDisplay>
            <BillWrapper id="billwrapper">
              <ProductsCart />
            </BillWrapper>
            <BillPrice>{totalOrder}€</BillPrice>
          </BigHalf>
        </LeftColumn>
        <RightColumn>
        
        </RightColumn>
        
      </HomeSection>
        {barMenuOpen && (
          <BarMenu setBarMenuOpen={setBarMenuOpen} barMenuOpen={barMenuOpen} setProductsMenu={setProductsMenu} productsMenu={productsMenu} setActionMenu={setActionMenu} actionMenu={actionMenu}/>
        )}
        {productsMenu && (
        <ProductsFilter setProductsMenu={setProductsMenu} productsMenu={productsMenu} showOverlay={showOverlay} setShowOverlay={setShowOverlay}/>
        )}
        {actionMenu && (
          <SetActionMenu actionMenu={actionMenu} setActionMenu={setActionMenu}  setProductsMenu={setProductsMenu} productsMenu={productsMenu} barMenuOpen={barMenuOpen} setBarMenuOpen={setBarMenuOpen}/>
        )}
    </motion.div>
  )
}


