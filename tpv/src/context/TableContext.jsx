import React, { useEffect } from 'react'
import { createContext, useContext, useState } from "react"
import axios from "axios"

const Table = createContext();

const TableContext = ({children}) => {

    const [tableEmpty, setTableEmpty] = useState(false);
    const [activeFamily, setActiveFamily] = useState("REFRESCOS");
    const [selectedTable, setSelectedTable] = useState("");
    const [totalOrder, setTotalOrder] = useState(0);
    const [cartModified, setCartModified] = useState(false);
    const [tableToTransfer, setTableToTransfer] = useState("");
    const [tableToSplit, setTableToSplit] = useState("");
    const [data, setData] = useState([]);
    const [tableDetails, setTableDetails] = useState([])
    const [tableAmount, setTableAmount] = useState("");
    const [tablePaymentMethod, setTablePaymentMethod] = useState("");
    const [billDate, setBillDate] = useState();
    const [billTime, setBillTime] = useState();
    const [reportCierreData, setReportCierreData] = useState([]);
    
    return(
        <Table.Provider value = {{ setBillTime, billTime, setBillDate, billDate, setTableDetails, tableDetails, setTableAmount, tableAmount, setTablePaymentMethod, tablePaymentMethod, 
            data, setData, setTableToSplit, tableToSplit, tableToTransfer, setTableToTransfer, setTableEmpty, tableEmpty, selectedTable, setSelectedTable, activeFamily, setActiveFamily,
          setTotalOrder, totalOrder, setCartModified, cartModified, reportCierreData, setReportCierreData}}>
            {children}
        </Table.Provider>
    )
}

export default TableContext



export const TableState = () => {
    return useContext(Table);
}

