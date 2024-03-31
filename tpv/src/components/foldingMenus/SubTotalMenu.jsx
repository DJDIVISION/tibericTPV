import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import styled from 'styled-components';
import { Button, useTheme, IconButton, Avatar } from '@mui/material';
import { tokens } from "../../pages/theme";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { animationFour, transitionTwo } from "../../animations";
import { Section, CierresHeader, ClosePageIcon, CloseIconWrapper, ReturnIcon, Left, CloseText, CloseIconLineWrapper, DateTimeDiv,
    IconRowColumnTwo, LinkIcon, CierreCaja, SubTotal, IconRowRow, IconRowText, PickerTitle, PickerWrapper, PopoverTwo, item,
    MenuHeader, PageTimes, TableWrapper, ReportDisplay, ReportText, ControlCierresIcon} from '../../components';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import {Table, message} from "antd"
import firebase from 'firebase/compat/app';
import { db } from "../../components/firebase.jsx";
import 'dayjs/locale/es';
import { setDoc, doc, collection } from "firebase/firestore";
import { TableState } from '../../context/TableContext.jsx';

const SubTotalMenu = ({subTotalMenu, setSubTotalMenu, reportMenu, setReportMenu}) => {

    const [lastBill, setLastBill] = useState();
    const [todayDate, setTodayDate] = useState();
    const [dateNow, setDateNow] = useState(new Date());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const {data, setData} = TableState();

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
    
  return (
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
                <ReportButton onClick={() => getReport()}>GENERAR INFORME</ReportButton>
                </>
  )
}

export default SubTotalMenu

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

