import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import styled from 'styled-components';
import { Button, useTheme, IconButton, Avatar } from '@mui/material';
import { tokens } from "../../pages/theme";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import dayjs from 'dayjs';
import { animationFour, transitionTwo } from "../../animations";
import { Section, CierresHeader, ClosePageIcon, CloseIconWrapper, ReturnIcon, Left, CloseText, CloseIconLineWrapper, DateTimeDiv,
    IconRowColumnTwo, LinkIcon, CierreCaja, SubTotal, IconRowRow, IconRowText, PickerTitle, PickerWrapper, PopoverTwo, item,
    MenuHeader, CloseCaption, TableWrapper, ReportDisplay, ReportText, ControlCierresIcon} from '../../components';
import { TableState } from '../../context/TableContext';
import DvrIcon from '@mui/icons-material/Dvr';
import firebase from 'firebase/compat/app';
import HighlightOff from '@mui/icons-material/HighlightOff';

const ReportMenuMenu = ({reportMenu, setReportMenu, setDetailMenu, detailMenu}) => {

    const {data, setData} = TableState();
    const [totalEfectivo, setTotalEfectivo] = useState();
    const [totalTarjeta, setTotalTarjeta] = useState();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {billDate, setBillDate} = TableState();
    const {billTime, setBillTime} = TableState();
    const {tableDetails, setTableDetails} = TableState();
    const {tableAmount, setTableAmount} = TableState();
    const {tablePaymentMethod, setTablePaymentMethod} = TableState();

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

    const getTableDetails = async (event, cellValues) => {
        console.log(cellValues)
        const date = cellValues.row.fecha;
        setBillDate(date);
        const time = cellValues.row.hora
        setBillTime(time);
        const snapshot = await firebase.firestore().collection('facturas')
            .where('fecha', '==', date)
            .where('hora', '==', time).get();
            if (snapshot.empty) {
                message.error("No existe esta mesa!")
                return;
            }
            snapshot.forEach(doc => {
                setTableDetails(doc.data().productos)
                setTableAmount(doc.data().importe)
                setTablePaymentMethod(doc.data().metodoPago)
            })
        setDetailMenu(true);
    }


    const columns = [
        { field: 'fecha', headerName: 'FECHA', width: '150' },
        { field: 'hora', headerName: 'HORA', width: '150' },
        { field: 'mesa', headerName: 'MESA', width: '150' },
        { field: 'importe', headerName: 'IMPORTE', width: '150' },
        { field: 'metodoPago', headerName: 'METODO PAGO', width: '200' },
        {
            field: "DETALLES",
            headerName: "DETALLES",
            renderCell: (cellValues) => (
                <IconButton onClick={(event) => {
                  getTableDetails(event, cellValues);
                }}><DvrIcon /></IconButton>
              ),
          },
    ]

    const closeReportMenu = () => {
        setReportMenu(!reportMenu);
    }

    console.log(data)

  return (
    <motion.div className="menu-container-six" variants={item}
                initial={{height:0, opacity:0}}
                animate={{height:"100vh", opacity:1}}
                transition={{duration:.5}}
                exit="exit">
                    <PopoverTwo>
                        <MenuHeader>
                            <CloseCaption onClick={() => closeReportMenu()}><HighlightOff /></CloseCaption>
                        </MenuHeader>
                        <TableWrapper>
                        <DataGrid rows={data} columns={columns} getRowId={(row) => row.hora} slots={{ toolbar: GridToolbar }} 
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            width: '85%',
                            height: '100%',
                            color: 'white',
                            textAlign: 'center',
                            borderColor: colors.grey[500],
                            textTransform: 'uppercase',
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
  )
}

export default ReportMenuMenu
