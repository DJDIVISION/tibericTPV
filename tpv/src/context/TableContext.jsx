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
    
    
    return(
        <Table.Provider value = {{ setTableToSplit, tableToSplit, tableToTransfer, setTableToTransfer, setTableEmpty, tableEmpty, selectedTable, setSelectedTable, activeFamily, setActiveFamily,
          setTotalOrder, totalOrder, setCartModified, cartModified}}>
            {children}
        </Table.Provider>
    )
}

export default TableContext



export const TableState = () => {
    return useContext(Table);
}

