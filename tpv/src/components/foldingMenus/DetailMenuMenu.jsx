import React, {useEffect, useState} from 'react'
import {motion} from "framer-motion"
import styled from 'styled-components';
import { Button, useTheme, IconButton, Avatar } from '@mui/material';
import { tokens } from "../../pages/theme";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { Section, CierresHeader, ClosePageIcon, CloseIconWrapper, ReturnIcon, Left, CloseText, CloseIconLineWrapper, DateTimeDiv,
    IconRowColumnTwo, LinkIcon, CierreCaja, SubTotal, IconRowRow, IconRowText, PickerTitle, PickerWrapper, PopoverTwo, item,
    MenuHeader, CloseCaption, TableWrapper, ReportDisplay, ReportText, ControlCierresIcon} from '../../components';
import { TableState } from '../../context/TableContext';
import HighlightOff from '@mui/icons-material/HighlightOff';

const DetailMenuMenu = ({setDetailMenu, detailMenu, reportCierres, setReportCierres}) => {

    const {tableDetails, setTableDetails} = TableState();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {billDate, setBillDate} = TableState();
    const {billTime, setBillTime} = TableState();
    const {tableAmount, setTableAmount} = TableState();
    const {tablePaymentMethod, setTablePaymentMethod} = TableState();

    const columnsTwo = [
        {
            field: "imagen",
            headerName: "IMAGEN",
            width: '150',
            renderCell: (params) => (
                <Avatar alt="Image" src={params.row.imagen} sx={{ width: 40, height: 40 }} />
              ),
          },
        { field: 'producto', headerName: 'PRODUCTO', width: '200' },
        { field: 'precio', headerName: 'PRECIO', width: '150' },
        { field: 'cantidad', headerName: 'CANTIDAD', width: '150' },
        
    ]

    const closeDetailMenu = () => {
        setDetailMenu(!detailMenu);
    }

  return (
    <motion.div className="menu-container-six" variants={item}
                initial={{height:0, opacity:0}}
                animate={{height:"100vh", opacity:1}}
                transition={{duration:.5}}
                exit="exit">
                    <PopoverTwo>
                        <MenuHeader>
                            <CloseCaption onClick={() => closeDetailMenu()}><HighlightOff /></CloseCaption>
                        </MenuHeader>
                        <TableWrapper>
                        <DataGrid rows={Object.values(tableDetails)} columns={columnsTwo} getRowId={(row) => row.imagen} slots={{ toolbar: GridToolbar }} 
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            width: '60%',
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
                            <ReportText>FECHA: {billDate}</ReportText>
                            <ReportText>HORA: {billTime}</ReportText>
                            <ReportText>TOTAL: {tableAmount}€</ReportText>
                            <ReportText>MÉTODO: {tablePaymentMethod}</ReportText>
                        </ReportDisplay>
                    </PopoverTwo>
                </motion.div>
  )
}

export default DetailMenuMenu
