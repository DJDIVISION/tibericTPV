import React, {useState, useEffect, useContext} from 'react'
import { motion } from 'framer-motion'
import styled from "styled-components"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import {MenuSection, MenuHeader, MenuTitle, MenuTitleTop, item, Times, Popover, Header, IconRow, Cross,
Check} from "../index.jsx"
import { TableState } from '../../context/TableContext.jsx';
import { db } from "../../components/firebase.jsx";
import {  getFirestore, getDoc,  setDoc, doc, collection } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { CartContext, TotalOrderContext } from "../../context/contexts.jsx"
import { message, Modal } from 'antd';


const BarMenu = ({setBarMenuOpen, barMenuOpen, productsMenu, setProductsMenu, setActionMenu, actionMenu, tableSettings, setTableSettings, splitMenu, setSplitMenu, transferTable, setTransferTable, splitTable, setSplitTable}) => {

    const [bills, setBills] = useState([]);
    const [allTables, setAllTables] = useState([]);
    const {selectedTable, setSelectedTable} = TableState();
    const {tableToTransfer, setTableToTransfer} = TableState();
    const {tableToSplit, setTableToSplit} = TableState();
    const [billMenuOpen, setBillMenuOpen] = useState(false);
    const {tableEmpty, setTableEmpty} = TableState(); 
    const [transferProducs, setTransferProducts] = useState([]);
    const {cart, setCart} = useContext(CartContext);
    const {totalOrder, setTotalOrder} = useContext(TotalOrderContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const getBills = async () => {
      const snapshot = await firebase.firestore().collection('cuentas').get()
      if(snapshot){
        snapshot.forEach((doc) => {
          const res = (doc.data());
          if(res[0].producto === ""){
            document.getElementById(doc.id).classList.remove("inactive");
            document.getElementById(doc.id).classList.add("active");
          }
        })
      } else {
        console.log("No such document!");
      }
    }

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {
      getBills();
    }, []);

    useEffect(() => {
      console.log(selectedTable);
    }, [selectedTable]);

    useEffect(() => {
      console.log(tableToTransfer);
    }, [tableToTransfer]);

    const closeMenu = () => {
        setBarMenuOpen(!barMenuOpen);
        setProductsMenu(false);
        setTableSettings(false);
        setSplitTable(false);
        setTransferTable(false);
        setTableToTransfer("");
        setTableToSplit("");
        setCart([]);
        setTotalOrder(0);
        setSelectedTable("");
    }


    

  const Openpop = async (el) => {
    if(tableToTransfer ===  el.target.id){
      message.error("La mesa seleccionada es la misma!");
      return
    }
    if(tableToSplit){
      setSplitMenu(true);
      setSelectedTable(el.target.id);
      return
    }
    if(tableSettings === true){
      setSelectedTable(el.target.id);
      console.log(selectedTable);
      console.log(tableToTransfer);
      const docRef = doc(db, "cuentas", el.target.id);
      const docSnap = await getDoc(docRef);
      const res = docSnap.data();
      setTransferProducts(docSnap.data());
      console.log(res[0].producto);
      if(!res[0].producto){
        await setDoc(doc(db, "cuentas", el.target.id), {
          ...cart
        });
      await setDoc(doc(db, "cuentas", tableToTransfer), {
        0 : {
            producto: "",
            precio: "",
            cantidad: "",
            imagen: "",
            familia: "",
            id: ""
        }
    })
      message.success("Mesa transferida con éxito!");
      setBarMenuOpen(!barMenuOpen);
      setActionMenu(false);
      setTableSettings(false);
      setSelectedTable("");
      setTableSettings(!tableSettings);
      setTransferTable(!transferTable)
      setCart([]);
      } else {
        showModal();
      }
        
    } else {
      setSelectedTable(el.target.id);
      setBarMenuOpen(!barMenuOpen);
      setActionMenu(!actionMenu);
      const checkRef = db.collection('cuentas').doc(el.target.id);
      const doc = await checkRef.get();
      const res = (doc.data());
      if(res[0].producto !== ""){
        setCart(res);
      }
    }

  }

  const handleOk = async () => {
    const newCart = Object.values(cart);
    const newTrans = Object.values(transferProducs);
    const prods = [
      ...newCart,
      ...newTrans
    ]

    function groupById(array) {
      let groupedArray = array.reduce((acc, obj) => {
          const found = acc.find(item => item.id === obj.id);
          if (found) {
              found.cantidad += obj.cantidad;
          } else {
              acc.push({...obj});
          }
          return acc;
      }, []);
  
      return groupedArray;
  }
  
      let groupedArray = groupById(prods);
      await setDoc(doc(db, "cuentas", selectedTable), {
        ...groupedArray
      });
      await setDoc(doc(db, "cuentas", tableToTransfer), {
          0 : {
              producto: "",
              precio: "",
              cantidad: "",
              imagen: "",
              familia: "",
              id: ""
          }
      })
      message.success("Mesa transferida con éxito!");
      setBarMenuOpen(!barMenuOpen);
      setActionMenu(false);
      setTableSettings(false);
      setSelectedTable("");
      setTableSettings(!tableSettings);
      setTransferTable(!transferTable)
      setCart([]);
  };

  return (
    <motion.div className="menu-container-four" variants={item}
          initial={{width:0,opacity:0, x: "25vw"}}
          animate={{width:"75vw", opacity:1}}
          transition={{duration:.5}}
          exit="exit">
            <MenuSection>
            <MenuHeader>
                <Times onClick={closeMenu}><HighlightOffIcon /></Times>  
            </MenuHeader>
            <MenuTitleTop>BARRA</MenuTitleTop>
            <MenuTitle>SELECCIONA UNA MESA</MenuTitle>
            <Tables >
                <Table className="inactive" id="b1" onClick={(el) => {Openpop(el)}}>B1</Table>
                <Table className="inactive" id="b2" onClick={(el) => {Openpop(el)}}>B2</Table>
                <Table className="inactive" id="b3" onClick={(el) => {Openpop(el)}}>B3</Table>
                <Table className="inactive" id="b4" onClick={(el) => {Openpop(el)}}>B4</Table>
                <Table className="inactive" id="b5" onClick={(el) => {Openpop(el)}}>B5</Table>
                <Table className="inactive" id="b6" onClick={(el) => {Openpop(el)}}>B6</Table>
                <Table className="inactive" id="b7" onClick={(el) => {Openpop(el)}}>B7</Table>
                <Table className="inactive" id="b8" onClick={(el) => {Openpop(el)}}>B8</Table>
            </Tables>
            <Modal title="¡Mesa ocupada!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>La mesa de destino está ocupada.</p>
            <p>¿Quieres unir las dos mesas?</p>
          </Modal>
            </MenuSection>
          </motion.div>
  )
}

export default BarMenu




const IconBack = styled(IconButton)`
    &&&{
        transform: scale(1.6);
        background: grey;
    }
`;





const Tables = styled.div`
    width: 95%;
    height: 175px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    place-items: center;
    
    
`;

const Table = styled.div`
    height: 120px;
    width: 100px;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    
    /* border: 1px solid red;
    border: ${({ selectedTable }) => (selectedTable ? "1px solid blue" : "1px solid red")}; */
    margin: 0 5px;
    display: grid;
    place-items: center;
`;

 
