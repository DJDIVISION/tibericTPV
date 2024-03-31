import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import styled from 'styled-components';
import { Button, useTheme, IconButton, Avatar } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from "../../pages/theme";
import dayjs from 'dayjs';
import { animationFour, transitionTwo } from "../../animations";
import { CloseCaption, Times, CierresTitle, CloseIconWrapper, ReturnIcon, Left, CloseText, CloseIconLineWrapper, DateTimeDiv,
    IconRowColumnTwo, LinkIcon, CierreCaja, SubTotal, IconRowRow, IconRowText, PickerTitle, PickerWrapper, PopoverTwo, item,
    MenuHeader, PageTimes, TableWrapperTwo, ReportDisplay, ReportText, ControlCierresIcon} from '..';
import firebase from 'firebase/compat/app';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DvrIcon from '@mui/icons-material/Dvr';
import { esES } from '@mui/x-data-grid/locales';
import { TableState } from '../../context/TableContext';
import { Table } from "antd";

const ControlCierresMenu = ({controlCierres, setControlCierres, setReportCierres, reportCierres}) => {

    const [cierres, setCierres] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {reportCierreData, setReportCierreData} = TableState();

    const setControlCierre = () => {
        setControlCierres(!controlCierres);
    }

    const getCierres = async () => {
        const snapshot = await firebase.firestore().collection('cierres').get()
        setCierres(snapshot.docs.map(doc => doc.data()));
    }

    useEffect(() => {
        getCierres();
    }, []);

    console.log(typeof cierres) 

    const columns = [
        { dataIndex: 'fechaInicio', title: 'INICIO', key: 'fechaInicio' },
        { dataIndex: 'fechaFinal', title: 'FINAL', key: 'fechaFinal' },
        { dataIndex: 'cuentasEfectivo', title: 'CUENTAS EFECTIVO', key: 'cuentasEfectivo' },
        { dataIndex: 'cuentasTarjeta', title: 'CUENTAS TARJETA', key: 'cuentasTarjeta' },
        { dataIndex: 'efectivo', title: 'CANT. EFECTIVO', key: 'efectivo' },
        { dataIndex: 'tarjeta', title: 'CANT. TARJETA', key: 'tarjeta' },
        { dataIndex: 'total', title: 'CANT. TOTAL', key: 'total' },
        {
            title: "DETALLES",
            dataIndex: "id",
            render:(id, record) => 
            <IconButton onClick={() => {getTableDetails(id, record);}}>
              <DvrIcon />
            </IconButton>
            
        }
        /* {
            field: "DETALLES",
            headerName: "DETALLES",
            renderCell: (cellValues) => (
                <IconButton onClick={(event) => {
                  getTableDetails(event, cellValues);
                }}><DvrIcon /></IconButton>
              ),
          }, */
    ]
    const getTableDetails = async (id, record) => {
        setReportCierres(!reportCierres)
        setReportCierreData(record);
        
    }

    console.log(reportCierreData)

  return (
    <motion.div className="menu-container-six" variants={item}
        initial={{height:0, opacity:0}}
        animate={{height:"100vh", opacity:1}}
        transition={{duration:.5}}
        exit="exit">
            <PopoverTwo>
                <MenuHeader>
                <CloseCaption onClick={setControlCierre}><HighlightOffIcon /></CloseCaption>
                <CierresTitle>CIERRES</CierresTitle>
                </MenuHeader>
                <TableWrapperTwo>
                <Table dataSource={cierres} columns={columns} />
                        {/* <DataGrid rows={cierres} columns={columns} getRowId={(row) => row.productosEfectivo} slots={{ toolbar: GridToolbar }} 
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            width: '95%',
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
                        </TableWrapperTwo>
            </PopoverTwo>
    </motion.div>
  )
}

export default ControlCierresMenu
