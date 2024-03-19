import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import styled from 'styled-components';
import { Button, useTheme, IconButton } from '@mui/material';
import { tokens } from "./theme.jsx";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { animationFour, transitionTwo } from "../animations";
import { Section, CierresHeader, ClosePageIcon, CloseIconWrapper, ReturnIcon, Left, CloseText, CloseIconLineWrapper, DateTimeDiv,
    IconRowColumnTwo, LinkIcon, CierreCaja, SubTotal, IconRowRow, IconRowText, PickerTitle, PickerWrapper, PopoverTwo, item,
    MenuHeader, PageTimes, TableWrapper, ReportDisplay, ReportText} from '../components';
import {Link as LinkR} from "react-router-dom"
import { StaticDateTimePicker  } from '@mui/x-date-pickers/StaticDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {message} from "antd"
import firebase from 'firebase/compat/app';
import { db } from "../components/firebase.jsx";
import 'dayjs/locale/es';
import { setDoc, doc, collection } from "firebase/firestore";



const Cierres = () => {

    const [lastBill, setLastBill] = useState();
    const [dateNow, setDateNow] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [todayDate, setTodayDate] = useState();
    const [data, setData] = useState([]);
    const [dataToSend, setDataToSend] = useState([]);
    const [reportMenu, setReportMenu] = useState(false);
    const [totalEfectivo, setTotalEfectivo] = useState();
    const [totalTarjeta, setTotalTarjeta] = useState();
    const [subTotalMenu, setSubTotalMenu] = useState(true);
    const [totalMenu, setTotalMenu] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    dayjs.locale("es");

    const getClosedDays = async () => {
        const snapshot = await firebase.firestore().collection('cierres').get()
        if(snapshot){
            snapshot.forEach((doc) => {
                const maxDate = dayjs(new Date(Math.max(doc.id)));
                const date = maxDate.format("YYYY-MM-DD HH:mm");
                const maxTime = new Date(Math.max(doc.id)).toLocaleTimeString();
                setLastBill(date);
                console.log(maxTime);
            })
        }
        const today = dayjs(new Date(dateNow));
        const todDate = today.format("YYYY-MM-DD");
        setTodayDate(todDate);
    }

    useEffect(() => {
        getClosedDays();
    }, [])

    useEffect(() => {
        console.log(lastBill);
    }, [lastBill]);

    useEffect(() => {
        console.log(dataToSend);
    }, [dataToSend]);

    useEffect(() => {
        console.log(totalEfectivo);
    }, [totalEfectivo]);

    useEffect(() => {
        console.log(totalTarjeta);
    }, [totalTarjeta]);

    /* console.log("startTime", startTime);
    console.log("endTime", endTime); */

    const getReport = async () => {
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        if(startDate === endDate){
            message.error("Las horas seleccionadas son las mismas!")
        } else if (startDate > endDate ){
            message.error("La hora final es menor que la inicial!")
        } else {
            
            const snapshot = await firebase.firestore().collection('facturas')
            .where(firebase.firestore.FieldPath.documentId(), '>', startDate.toString())
            .where(firebase.firestore.FieldPath.documentId(), '<', endDate.toString()).get();
            if (snapshot.empty) {
                message.error("No hay cuentas en este rango de fechas!")
                return;
            }
            setData(snapshot.docs.map(doc => doc.data()));
            setReportMenu(!reportMenu);
        }
    }

    const getTotals = () => {
        if(data){
            const cash = data.filter(el => el.metodoPago === "EFECTIVO");
            const cashTotal = [];
            cash.forEach((el) => {
                cashTotal.push(el.importe);
            })
            setTotalEfectivo(cashTotal.reduce((a,b) => a+b, 0).toFixed(2));
            const card = data.filter(el => el.metodoPago === "TARJETA");
            const cardTotal = [];
            card.forEach((el) => {
                cardTotal.push(el.importe);
            })
            setTotalTarjeta(cardTotal.reduce((a,b) => a+b, 0).toFixed(2));
            /* data.forEach((el) => {
                console.log(el);
            }) */
        }
    }

    useEffect(() => {
        getTotals();
    }, [data])

    const closeMenu = () => {
        setReportMenu(!reportMenu);
    }

    console.log(totalEfectivo);

    const columns = [
        { field: 'fecha', headerName: 'FECHA', width: '150' },
        { field: 'hora', headerName: 'HORA', width: '150' },
        { field: 'mesa', headerName: 'MESA', width: '150' },
        { field: 'importe', headerName: 'IMPORTE', width: '150' },
        { field: 'metodoPago', headerName: 'METODO PAGO', width: '200' },
    ]

    const setSub = () => {
        setSubTotalMenu(true);
        setTotalMenu(false);
    }

    const setCierre = () => {
        setSubTotalMenu(false);
        setTotalMenu(true);
    }

    const closeReport = async () => {
        const endDate = new Date().getTime().toString();
        const start = dayjs(lastBill);
        const startDate = (start.$d.getTime().toString());
        console.log(typeof startDate);
        console.log(typeof endDate);
        const snapshot = await firebase.firestore().collection('facturas')
            .where(firebase.firestore.FieldPath.documentId(), '>', startDate.toString())
            .where(firebase.firestore.FieldPath.documentId(), '<', endDate.toString()).get();
            if (snapshot.empty) {
                message.error("No hay cuentas en este rango de fechas!")
                return;
            } else {
                const array = [];
                snapshot.forEach((el) => {
                    array.push(el.data());
                })
                console.log(array);
                const cash = array.filter(el => el.metodoPago === "EFECTIVO");
                const card = array.filter(el => el.metodoPago === "TARJETA");
                console.log(cash);
                console.log(card);
                const cashTotal = [];
                const cardTotal = [];
                const cashNumber = [];
                const cardNumber = [];
                const cashProducts = [];
                const cardProducts = [];
                cash.forEach((el) => {
                    cashTotal.push(el.importe);
                    cashNumber.push(1);
                    cashProducts.push(el.productos);
                })
                card.forEach((el) => {
                    cardTotal.push(el.importe);
                    cardNumber.push(1);
                    cardProducts.push(el.productos);
                })
                console.log(cashNumber);
                const cashAmount = (cashNumber.reduce((a,b) => a+b, 0));
                const cardAmount = (cardNumber.reduce((a,b) => a+b, 0));
                const totalEf = (cashTotal.reduce((a,b) => a+b, 0).toFixed(2));
                const totalTa = (cardTotal.reduce((a,b) => a+b, 0).toFixed(2));
                const totalEfec = parseFloat(totalEf);
                const totalCard = parseFloat(totalTa);
                const total = totalEfec + totalCard;
                await setDoc(doc(db, "cierres", endDate), {
                    efectivo: totalEfec,
                    tarjeta: totalCard,
                    total: total,
                    cuentasEfectivo: cashAmount,
                    cuentasTarjeta: cardAmount,
                    productosEfectivo: cashProducts,
                    productosTarjeta: cardProducts
                })
                message.success("Cierre de caja realizado con éxito!");
                window.location.reload();
            }
    }

  return (
    
    <motion.div initial="out" animate="in" variants={animationFour} transition={transitionTwo}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Section>
                <CierresHeader>
                <CloseIconWrapper><ClosePageIcon><LinkR to="/"><ReturnIcon><Left /></ReturnIcon></LinkR></ClosePageIcon><CloseText>VOLVER</CloseText></CloseIconWrapper>
                <CloseIconLineWrapper>
                    <IconRowColumnTwo>
                        <IconRowRow>
                            <LinkIcon onClick={() => setSub()}><SubTotal /></LinkIcon>
                        </IconRowRow>
                        <IconRowText onClick={() => setSub()}>SUBTOTAL</IconRowText>
                    </IconRowColumnTwo>
                    <IconRowColumnTwo>
                    <IconRowRow>
                        <LinkIcon onClick={() => setCierre()}><CierreCaja /></LinkIcon>
                    </IconRowRow>
                    <IconRowText onClick={() => setCierre()}>CIERRE CAJA</IconRowText>  
                    </IconRowColumnTwo>
                </CloseIconLineWrapper>
                <CloseIconWrapper></CloseIconWrapper>
                </CierresHeader>
                {subTotalMenu && (
                    <DateTimeDiv>
                    <IconRowColumnTwo>
                    <PickerTitle>FECHA DE INICIO</PickerTitle>
                    <PickerWrapper>
                        <DateTimePicker
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            minDate={dayjs(lastBill)}
                            maxDate={dayjs(todayDate)}
                            onChange={(val) => setStartDate(val.$d.getTime())}
                        />
                        {/* <DatePicker  sx={{color: "white"}} minDate={dayjs(lastBill)} maxDate={dayjs(todayDate)} onChange={(val) => setStartDate(val.$d)}/> */}
                    </PickerWrapper>
                    </IconRowColumnTwo>
                    <IconRowColumnTwo>
                    <PickerTitle>FECHA FINAL</PickerTitle>
                    <PickerWrapper>
                        <DateTimePicker
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                minDate={dayjs(lastBill)}
                                maxDate={dayjs(todayDate)}
                                onChange={(val) => setEndDate(val.$d.getTime())}
                                disableFuture={true}
                            />
                    </PickerWrapper>
                    </IconRowColumnTwo>
                </DateTimeDiv>
                )}
                {totalMenu && (
                    <>
                    <DateTimeDiv>
                    <IconRowColumnTwo>
                    <PickerTitle>FECHA DE INICIO</PickerTitle>
                    <PickerWrapper>
                        <DateTimePicker
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            value={dayjs(lastBill)}
                            id="fechaInicio"
                            readOnly
                        />
                        {/* <DatePicker  sx={{color: "white"}} minDate={dayjs(lastBill)} maxDate={dayjs(todayDate)} onChange={(val) => setStartDate(val.$d)}/> */}
                    </PickerWrapper>
                    </IconRowColumnTwo>
                    <IconRowColumnTwo>
                    <PickerTitle>FECHA FINAL</PickerTitle>
                    <PickerWrapper>
                        <DateTimePicker
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                                value={dayjs(dateNow)}
                                id="fechaFinal"
                                readOnly
                            />
                    </PickerWrapper>
                    </IconRowColumnTwo>
                </DateTimeDiv>
                
                </>
                )}
                {subTotalMenu && <ReportButton onClick={() => getReport()}>GENERAR INFORME</ReportButton>}
                {totalMenu && 
                <>
                <ReportButton onClick={() => closeReport()}>CERRAR CAJA</ReportButton>
                <ReportReport>
                <h1>· El último cierre de caja fue efectuado el {lastBill}</h1>
                </ReportReport>
            </>}
            </Section>
            {reportMenu && (
                <motion.div className="menu-container-six" variants={item}
                initial={{height:0, opacity:0}}
                animate={{height:"100vh", opacity:1}}
                transition={{duration:.5}}
                exit="exit">
                    <PopoverTwo>
                        <MenuHeader>
                            <IconButton onClick={() => closeMenu()} style={{marginTop: "30px", marginLeft: "30px"}}><PageTimes /></IconButton>
                        </MenuHeader>
                        <TableWrapper>
                        <DataGrid rows={data} columns={columns} getRowId={(row) => row.hora} slots={{ toolbar: GridToolbar }} 
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            width: '70%',
                            height: '100%',
                            color: 'white',
                            textAlign: 'center',
                            borderColor: colors.grey[500],
                            "& .MuiDataGrid-root": {
                                border: "none",
                                color: colors.primary[500],
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                                color: "black",
                                fontWeight: "bold",
                            },
                            "& .name-column--cell": {
                                color: colors.primary[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.grey[500],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: colors.primary[800],
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: colors.primary[700],
                            },
                            "& .MuiCheckbox-root": {
                                color: `${colors.primary[200]} !important`,
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `${colors.grey[500]} !important`,
                            },
                        }}/>
                        </TableWrapper>
                        <ReportDisplay>
                            <ReportText>TOTAL EFECTIVO: {totalEfectivo}€</ReportText>
                            <ReportText>TOTAL TARJETA: {totalTarjeta}€</ReportText>
                            <ReportText>TOTAL: {parseFloat(totalEfectivo) + parseFloat(totalTarjeta)}€</ReportText>
                        </ReportDisplay>
                    </PopoverTwo>
                </motion.div>
            )}
        </LocalizationProvider>
    </motion.div>
  )
}

export default Cierres

const ReportButton = styled(Button)`
  &&&{
    border: 1px solid green;
    color: darkgreen;
    font-size: 16px;
    padding: 5px 10px;
    background: lightgreen;
    font-weight: bold;
  }
`;

const ReportReport = styled.div`
    width: 90%;
    height: 10vh;
    margin-top: 150px;
    color: white;
    font-size: 12px;
`;
