import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import styled from 'styled-components';
import { Button, useTheme, IconButton, Avatar } from '@mui/material';
import { tokens } from "../../pages/theme";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import dayjs from "dayjs"
import { CloseCaption, CierresHeader, ClosePageIcon, CloseIconWrapper, ReturnIcon, Left, CloseText, CloseIconLineWrapper, DateTimeDiv,
    IconRowColumnTwo, LinkIcon, CierreCaja, SubTotal, IconRowRow, IconRowText, PickerTitle, PickerWrapper, PopoverTwo, item,
    MenuHeader, PageTimes, TableWrapper, ReportDisplayColumn, ReportColumnText, ReportDisplayColumnTwo} from '..';
import { TableState } from '../../context/TableContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import firebase from 'firebase/compat/app';
import DvrIcon from '@mui/icons-material/Dvr';
import { Table } from "antd";

const ReportCierresMenu = ({reportCierres, setReportCierres, setDetailMenu, detailMenu, controlCierres, setControlCierres}) => {

    const {reportCierreData, setReportCierreData} = TableState();
    const [initialDate, setInitialDate] = useState();
    const [finalDate, setFinalDate] = useState();
    const [tableData, setTableData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {tableDetails, setTableDetails} = TableState();
    const {tableAmount, setTableAmount} = TableState();
    const {tablePaymentMethod, setTablePaymentMethod} = TableState();
    const {billDate, setBillDate} = TableState();
    const {billTime, setBillTime} = TableState();
    

  const getFacturas = async () => {
    const initDate = reportCierreData.fechaInicioMS;
    const finDate = reportCierreData.fechaFinalMS;
    console.log(initDate)
    console.log(finDate)
    const snapshot = await firebase.firestore().collection('facturas')
            .where(firebase.firestore.FieldPath.documentId(), '>', initDate)
            .where(firebase.firestore.FieldPath.documentId(), '<', finDate).get();
            if (snapshot.empty) {
                message.error("No hay cuentas en este rango de fechas!")
                return;
            }
            let facturasInDB = [];
            snapshot.forEach((doc) => {
              facturasInDB.push(doc.data());
            })
            setTableData(facturasInDB)
  }
  

  useEffect(() => {
    getFacturas()
  }, [])

  useEffect(() => {
    console.log(tableData);
  }, [])

  const closeReportCierresMenu = () => {
    setReportCierres(!reportCierres)
  }

  console.log("reportCierreData", reportCierreData)

  const getTableDetails = async (id, record) => {
    console.log(record);
    const date = record.fecha;
        setBillDate(date);
        const time = record.hora
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
            setReportCierres(!reportCierres);
            setControlCierres(!controlCierres);
        setDetailMenu(true);
  }

  const columns = [
    { dataIndex: 'fecha', title: 'FECHA', key: 'fecha' },
    { dataIndex: 'hora', title: 'HORA', key: 'hora' },
    { dataIndex: 'mesa', title: 'MESA', key: 'mesa' },
    { dataIndex: 'importe', title: 'IMPORTE', key: 'importe' },
    { dataIndex: 'metodoPago', title: 'METODO PAGO', key: 'metodoPago' },
    {
      title: "DETALLES",
      dataIndex: "id",
      render:(id, record) => 
      <IconButton onClick={() => {getTableDetails(id, record)}}>
        <DvrIcon className='cart-action'/>
      </IconButton>
      
  }
]

  return (
    <motion.div className="menu-container-six" variants={item}
        initial={{height:0, opacity:0}}
        animate={{height:"100vh", opacity:1}}
        transition={{duration:.5}}
        exit="exit">
              <PopoverTwo>
                        <MenuHeader>
                            <CloseCaption onClick={() => closeReportCierresMenu()}><HighlightOffIcon /></CloseCaption>
                        </MenuHeader>
                        <TableWrapper>
                        <Table dataSource={tableData} columns={columns} style={{textTransform: 'uppercase', width: '80%', fontWeight: 'bold'}}/>
                        <ReportDisplayColumn>
                          <ReportDisplayColumnTwo>
                              <ReportColumnText><h1><span>INICIO: </span>{reportCierreData.fechaInicio}</h1></ReportColumnText>
                              <ReportColumnText><h1><span>CUENTAS EFECTIVO: </span>{reportCierreData.cuentasEfectivo}</h1></ReportColumnText>
                              <ReportColumnText><h1><span>TOTAL EFECTIVO: </span>{reportCierreData.efectivo}</h1></ReportColumnText>
                          </ReportDisplayColumnTwo>
                          <ReportDisplayColumnTwo>
                              <ReportColumnText><h1><span>FINAL: </span>{reportCierreData.fechaFinal}</h1></ReportColumnText>
                              <ReportColumnText><h1><span>CUENTAS TARJETA: </span>{reportCierreData.cuentasTarjeta}</h1></ReportColumnText>
                              <ReportColumnText><h1><span>TOTAL TARJETA: </span>{reportCierreData.tarjeta}</h1></ReportColumnText>
                          </ReportDisplayColumnTwo>
                        </ReportDisplayColumn>
                        <ReportColumnText><h1><span>TOTAL: </span>{reportCierreData.total}</h1></ReportColumnText>
                        {/* <DataGrid rows={tableData} columns={columns} getRowId={(row) => row.productos} slots={{ toolbar: GridToolbar }} 
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
                        }}/> */}
                        </TableWrapper>
              </PopoverTwo>
        </motion.div>
  )
}

export default ReportCierresMenu
