import React, {useState, useEffect, useContext} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from "styled-components"
import {ProductMenuSection, MenuHeader, FirstCell, MenuTitleTop, item, Families} from "../index.jsx"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton, Avatar } from '@mui/material';
import { TableState } from '../../context/TableContext.jsx';
import Family from './Family.jsx';
import { sleep } from "./helpers"; 
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";


function ProductsFilter({productsMenu, setProductsMenu, productParams, showOverlay, setShowOverlay}){

    const {selectedTable, setSelectedTable} = TableState();
    const dispatch = useDispatch();
    const {tableEmpty, setTableEmpty} = TableState(); 
    const {activeFamily, setActiveFamily} = TableState();
    const [filtered, setFiltered] = useState([]);
    const products = useSelector((state) => state.allProducts.products);
    

    useEffect(() => {
        if (activeFamily === "BEBIDAS"){
            const filtered = products.filter(el => el.familia === "BEBIDAS"); 
            setFiltered(filtered);
        } else if (activeFamily === "TAPAS"){
            const filtered = products.filter(el => el.familia === "TAPAS"); 
            setFiltered(filtered);
        } else if (activeFamily === "BOCADILLOS"){
            const filtered = products.filter(el => el.familia === "BOCADILLOS"); 
            setFiltered(filtered);
        } else if (activeFamily === "CERVEZAS"){
            const filtered = products.filter(el => el.familia === "CERVEZAS"); 
            setFiltered(filtered);
        } else if (activeFamily === "CAFÉS"){
            const filtered = products.filter(el => el.familia === "CAFÉS"); 
            setFiltered(filtered);
        } 
        
      }, [activeFamily, setFiltered, products])


    const closeMenu = () => {
        setProductsMenu(!productsMenu);
        setSelectedTable("");
        setTableEmpty(false);
    }

    useEffect(() => {
        console.log("Products" , products);
    }, [products])

  return (
    <motion.div className="menu-container-four" variants={item}
          initial={{width:"75vw",opacity:0, x: "25vw", y: "-200px"}}
          animate={{width:"75vw", opacity:1, y: 0}}
          transition={{duration:.5}}
          exit="exit">
            <ProductMenuSection>
                <MenuHeader>
                    <FirstCell><Times onClick={closeMenu}><HighlightOffIcon /></Times> </FirstCell>
                    <motion.div variants={item}
          initial={{opacity:0, y: "-200px"}}
          animate={{ opacity:1, y: 0}}
          transition={{duration:.5}}
          exit="exit">
                    <Families><Family /></Families>
                    </motion.div>
                    <FirstCell></FirstCell>  
                </MenuHeader>
                <motion.div variants={item}
          initial={{opacity:0, y: "65vh", width: "100%", x: "5vw"}}
          animate={{ opacity:1, y: 0,  width: "100%", x: "5vw"}}
          transition={{duration:.5}}
          exit="exit">
                <Filter>
                <AnimatePresence>
                {filtered && filtered.map((product) => <ProductItem productProps={product} key={product.id} productsMenu={productsMenu} setProductsMenu={setProductsMenu}/>)}
                </AnimatePresence>
                </Filter>
                </motion.div>
            </ProductMenuSection>
          </motion.div>
  )
}

export default ProductsFilter

const Times = styled(IconButton)`
    &&&{
        color: white;
        transform: scale(1.6);
        margin-left: 5px;
    }
`;

const Filter = styled.div`
    width: 87%;
    height: auto;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-row-gap: 80px;
    padding: 30px;
    //transform: translateX(-25vw);
    margin-top: 10vh;
`;

const Card = styled(motion.div)`
  width: 150px;
  height: 100px;
  border: 0.5px solid goldenrod;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Picture = styled.div`
    width: 95%;
    height: 60%;
    display: grid;
    place-items: center;
`;

const Text = styled.div`
    height: 20%;
    width: 95%;
    transform: translateY(-2px);
    white-space: nowrap;
    overflow:hidden !important;
    text-overflow: ellipsis;
    text-align: center;
    h1{
        color: white;
        font-size: 12px;
        
    }
`;