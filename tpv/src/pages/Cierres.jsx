import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import styled from 'styled-components';
import { Button, useTheme, IconButton, Avatar } from '@mui/material';
import { tokens } from "./theme.jsx";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { animationFour, transitionTwo } from "../animations";
import { Section, CierresHeader, ClosePageIcon, CloseIconWrapper, ReturnIcon, Left, CloseText, CloseIconLineWrapper, DateTimeDiv,
    IconRowColumnTwo, LinkIcon, CierreCaja, SubTotal, IconRowRow, IconRowText, PickerTitle, PickerWrapper, PopoverTwo, item,
    MenuHeader, PageTimes, TableWrapper, ReportDisplay, ReportText, ControlCierresIcon} from '../components';
import {Link as LinkR} from "react-router-dom"
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {Table, message} from "antd"
import firebase from 'firebase/compat/app';
import { db } from "../components/firebase.jsx";
import 'dayjs/locale/es';
import { setDoc, doc, collection } from "firebase/firestore";

import ControlCierresMenu from '../components/foldingMenus/ControlCierresMenu.jsx';
import ReportMenuMenu from '../components/foldingMenus/ReportMenu.jsx';
import SubTotalMenu from '../components/foldingMenus/SubTotalMenu.jsx';
import DetailMenuMenu from '../components/foldingMenus/DetailMenuMenu.jsx';
import ReportCierresMenu from '../components/foldingMenus/ReportCierresMenu.jsx';




const Cierres = () => {

    const [lastBill, setLastBill] = useState();
    const [dateNow, setDateNow] = useState(new Date());
    const [todayDate, setTodayDate] = useState();
    const [data, setData] = useState([]);
    const [dataToSend, setDataToSend] = useState([]);
    const [reportMenu, setReportMenu] = useState(false);
    const [controlCierres, setControlCierres] = useState(false);
    const [reportCierres, setReportCierres] = useState(false);
    const [subTotalMenu, setSubTotalMenu] = useState(true);
    const [totalMenu, setTotalMenu] = useState(false);
    const [detailMenu, setDetailMenu] = useState(false);

    dayjs.locale("es");

    const getClosedDays = async () => {
        const snapshot = await firebase.firestore().collection('cierres').get()
        if(snapshot){
            snapshot.forEach((doc) => {
                const maxDate = dayjs(new Date(Math.max(doc.id)));
                const date = maxDate.format("YYYY-MM-DD HH:mm");
                const maxTime = new Date(Math.max(doc.id)).toLocaleTimeString();
                setLastBill(date);
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


    const setSub = () => {
        setSubTotalMenu(true);
        setTotalMenu(false);
    }

    const setCierre = () => {
        setSubTotalMenu(false);
        setTotalMenu(true);
    }

    const setControlCierre = () => {
        setControlCierres(!controlCierres);
    }

    const closeReport = async () => {
        const endDate = new Date().getTime().toString();
        const start = dayjs(lastBill);
        console.log(lastBill)
        const startDate = (start.$d.getTime().toString());
        console.log("STARTDATE", startDate);
        console.log("ENDDATE", endDate);
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
                cash.forEach((el) => {
                    cashTotal.push(el.importe);
                    cashNumber.push(1);
                })
                card.forEach((el) => {
                    cardTotal.push(el.importe);
                    cardNumber.push(1);
                })
                console.log(cashNumber);
                const cashAmount = (cashNumber.reduce((a,b) => a+b, 0));
                const cardAmount = (cardNumber.reduce((a,b) => a+b, 0));
                const totalEf = (cashTotal.reduce((a,b) => a+b, 0).toFixed(2));
                const totalTa = (cardTotal.reduce((a,b) => a+b, 0).toFixed(2));
                const totalEfec = parseFloat(totalEf);
                const totalCard = parseFloat(totalTa);
                const total = totalEfec + totalCard;
                const startRange = new Date(parseInt(startDate)).toLocaleString();
                const endRange = new Date(parseInt(endDate)).toLocaleString();
                await setDoc(doc(db, "cierres", endDate), {
                    efectivo: totalEfec + "€",
                    tarjeta: totalCard + "€",
                    total: total + "€",
                    cuentasEfectivo: cashAmount,
                    cuentasTarjeta: cardAmount,
                    fechaInicio: startRange,
                    fechaFinal: endRange,
                    fechaInicioMS: startDate,
                    fechaFinalMS: endDate
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
                    <IconRowColumnTwo>
                    <IconRowRow>
                        <LinkIcon onClick={() => setControlCierre()}><ControlCierresIcon /></LinkIcon>
                    </IconRowRow>
                    <IconRowText onClick={() => setControlCierre()}>CONTROL CIERRES</IconRowText>  
                    </IconRowColumnTwo>
                </CloseIconLineWrapper>
                <CloseIconWrapper></CloseIconWrapper>
                </CierresHeader>
                {subTotalMenu && (
                   <SubTotalMenu subTotalMenu={subTotalMenu} setSubTotalMenu={setSubTotalMenu} reportMenu={reportMenu} setReportMenu={setReportMenu}/>
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
                
                {totalMenu && 
                <>
                <ReportButton onClick={() => closeReport()}>CERRAR CAJA</ReportButton>
                <ReportReport>
                <h1>· El último cierre de caja fue efectuado el {lastBill}</h1>
                </ReportReport>
            </>}
            </Section>
            {reportMenu && (
                <ReportMenuMenu reportMenu={reportMenu} setReportMenu={setReportMenu} data={data} setData={setData} setDetailMenu={setDetailMenu} detailMenu={detailMenu}/>
            )}
            {detailMenu && (
                <DetailMenuMenu setDetailMenu={setDetailMenu} detailMenu={detailMenu} reportCierres={reportCierres} setReportCierres={setReportCierres}/>
            )}
            {controlCierres && (
                <ControlCierresMenu controlCierres={controlCierres} setControlCierres={setControlCierres} reportCierres={reportCierres} setReportCierres={setReportCierres}/>
            )}
            {reportCierres && (
                <ReportCierresMenu reportCierres={reportCierres} setReportCierres={setReportCierres} setDetailMenu={setDetailMenu} detailMenu={detailMenu} controlCierres={controlCierres} setControlCierres={setControlCierres}/>
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
