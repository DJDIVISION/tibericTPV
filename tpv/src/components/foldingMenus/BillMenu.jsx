import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from "styled-components"
import { motion, useAnimation } from 'framer-motion'
import {Billpop, MenuHeader, MenuTitleTop, MenuTitle, BillRow, BillColumn, item, Times, BillIcon, BigButton, BillText, Cross, 
    Euro, Card} from "../index.jsx"
import { TableState } from '../../context/TableContext.jsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { db } from "../../components/firebase.jsx"
import { firebaseApp } from '../../components/firebase.jsx';
import {  getFirestore, setDoc,  updateDoc, doc } from "firebase/firestore";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import Add from '@mui/icons-material/Add'
import { useDispatch, useSelector } from 'react-redux'
import { CartContext, TotalOrderContext } from '../../context/contexts.jsx';
import { message } from 'antd';
import { useReactToPrint } from 'react-to-print';
import Logo from "../../images/restLogo.png"
import QR from "../../images/tibericQR.png"



const BillMenu = ({billMenu, setBillMenu, actionMenu, setActionMenu, barMenuOpen, setBarMenuOpen}) => {

    const {selectedTable, setSelectedTable} = TableState();
    const {tableEmpty, setTableEmpty} = TableState(); 
    const {cart, setCart} = useContext(CartContext);
    const {totalOrder, setTotalOrder} = useContext(TotalOrderContext)
    const [methodPayment, setMethodPayment] = useState();
    
    const closeMenu = () => {
        setBillMenu(!billMenu);
    }

    class ComponentToPrint extends React.PureComponent {
        render() {
          return (
            <BillMenuWrapper>
                <BillImage>
                    <img src={Logo} alt="image" />
                </BillImage>
                <BillAddress>C/ del Pintor Coello, 4-6</BillAddress>
                <BillZip>08191, Rubí</BillZip>
                <BillNif>NIF: 12345678B</BillNif>
                <BillAddress>MESA: {selectedTable.toUpperCase()}</BillAddress>
                <BillZip></BillZip>
                <table style={{width: '100%'}}>
                    <tbody>
                    <BillTitle>
                        <BillProducto>PRODUCTO</BillProducto>
                        <BillCantidad>CANT.</BillCantidad>
                        <BillPrecio>PRECIO</BillPrecio>
                    </BillTitle>
                    <BillTitle></BillTitle>
                    {Object.values(cart).map((el) => {
                        return(
                            <BillTitle key={el.producto}>
                                <BillProductoLine>{el.producto}</BillProductoLine>
                                <BillCantidadLine>{el.cantidad}</BillCantidadLine>
                                <BillPrecioLine>{el.precio * el.cantidad}€</BillPrecioLine>
                            </BillTitle>
                        )
                    })}
                    </tbody>
                </table>
                <BillTitle></BillTitle>
                <BillTitle>
                    <BillProductoLine></BillProductoLine>
                    <BillPrecioLine>TOTAL: </BillPrecioLine>
                    <BillPrecioLine>{totalOrder}€</BillPrecioLine>
                </BillTitle>
                <BillTitle>{methodPayment}</BillTitle>
                <BillZip>¡Muchas gracias por tu visita!</BillZip>
                <BillQR>
                    <img src={QR} alt="image" />
                </BillQR>
            </BillMenuWrapper>
          );
        }
      }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    console.log(ComponentToPrint);

    const setCash = async () => {
        const payment = "EFECTIVO";
        setMethodPayment("EFECTIVO");
        const date = new Date().toLocaleDateString().toString();
        const time = new Date().toLocaleTimeString().toString();
        const dateMS = new Date().getTime().toString();
        handlePrint();
        await setDoc(doc(db, "facturas", dateMS), {
            fecha: date, 
            hora: time, 
            importe: totalOrder, 
            mesa: selectedTable, 
            metodoPago: payment,
            productos: {...cart}
        })
        await setDoc(doc(db, "cuentas", selectedTable), {
            0 : {
                producto: "",
                precio: "",
                cantidad: "",
                imagen: "",
                familia: "",
                id: ""
            }
        })
        message.success("Mesa cobrada con éxito!");
        setBillMenu(false);
        setActionMenu(false);
        setBarMenuOpen(false);
        setCart([]);
        setSelectedTable("");
    }

    const setCard = async () => {
        const payment = "TARJETA";
        setMethodPayment("TARJETA");
        const date = new Date().toLocaleDateString().toString();
        const time = new Date().toLocaleTimeString().toString();
        const dateMS = new Date().getTime().toString();
        handlePrint();
        await setDoc(doc(db, "facturas", dateMS), {
            fecha: date, 
            hora: time, 
            importe: totalOrder, 
            mesa: selectedTable, 
            metodoPago: payment,
            productos: {...cart}
        })
        await setDoc(doc(db, "cuentas", selectedTable), {
            0 : {
                producto: "",
                precio: "",
                cantidad: "",
                imagen: "",
                familia: "",
                id: ""
            }
        })
        message.success("Mesa cobrada con éxito!");
        setBillMenu(false);
        setActionMenu(false);
        setBarMenuOpen(false);
        setCart([]);
        setSelectedTable("");
    }

   useEffect(() => {
    console.log(methodPayment)
   }, [methodPayment]); 
    

  return (
    <motion.div className="menu-container-five" variants={item}
    initial={{opacity:0, height: 0, x: "25vw"}}
    animate={{ opacity:1, height: "100vh", x: "25vw"}}
    transition={{duration:.5}}
    exit="exit">
        <Billpop>
        <MenuHeader>
        <Times onClick={closeMenu}><HighlightOffIcon /></Times>
        </MenuHeader>
                <MenuTitleTop>MESA: {selectedTable}</MenuTitleTop>
                <MenuTitle>IMPORTE: {totalOrder}€</MenuTitle>
                {/* <Hider> */}
                <ComponentToPrint ref={componentRef} />
                {/* </Hider> */}
                <MenuTitle>AÑADE METODO DE PAGO</MenuTitle>
                <BillRow>
                    <BillColumn>
                        <BillIcon>
                        <BigButton onClick={() => setCash()} id="cash"><Euro /></BigButton>
                        </BillIcon>
                        <BillText>EFECTIVO</BillText>
                    </BillColumn>
                    <BillColumn>
                        <BillIcon>
                        <BigButton onClick={() => setCard()} id="card"><Card /></BigButton>
                        </BillIcon>
                        <BillText>TARJETA</BillText>
                    </BillColumn>
                </BillRow>
        </Billpop>
    </motion.div>
  )
}

export default BillMenu

const BillMenuWrapper = styled.div`
    width: 80mm;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Hider = styled.div`
    width: 100%;
    height: 100%;
    display: none;
`;

const BillImage = styled.div`
    width: 100%;
    height: 30mm;
    display: grid;
    place-items: center;
    img{
        width: 100%;
        display: block;
        object-fit: contain;
    }
`;

const BillQR = styled.div`
    width: 100%;
    height: 30mm;
    display: grid;
    place-items: center;
    margin-top: 5mm;
    img{
        width: 60%;
        display: block;
        object-fit: cover;
    }
`;

const BillAddress = styled.div`
    width: 100%;
    height: 7mm;
    display: grid;
    place-items: center;
    color: black;
    font-size: 18px;
`;

const BillZip = styled.div`
    width: 100%;
    height: 5mm;
    display: grid;
    place-items: center;
    color: black;
    font-size: 16px;
`;

const BillNif = styled.div`
    width: 100%;
    height: 7mm;
    display: grid;
    place-items: center;
    color: black;
    font-size: 14px;
    margin-bottom: 5mm;
`;

const BillPrecio = styled.th`
    width: 15%;
    height: 100%;
    display: grid;
    place-items: center;
    color: black;
    font-size: 12px;
    border-bottom: 1px solid black;
`;

const BillCantidad = styled.th`
    width: 25%;
    height: 100%;
    display: grid;
    place-items: center;
    color: black;
    font-size: 12px;
    border-bottom: 1px solid black;
`;

const BillPrecioLine = styled.td`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    color: black;
    font-size: 16px;
`;

const BillCantidadLine = styled.td`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    color: black;
    font-size: 16px;
`;

const BillProducto = styled.th`
    width: 60%;
    height: 100%;
    display: flex;
    color: black;
    font-size: 12px;
    border-bottom: 1px solid black;
`;

const BillProductoLine = styled.td`
    width: 70%;
    height: 100%;
    display: flex;
    color: black;
    font-size: 16px;
`;

const BillTitle = styled.tr`
    width: 100%;
    height: 7mm;
    display: flex;
    color: black;
    font-size: 16px;
`;
