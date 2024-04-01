import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {motion} from "framer-motion"
import { animationFour, transitionTwo } from "../animations";
import { Section } from '../components';
import firebase from 'firebase/compat/app';
import { Line } from "react-chartjs-2";
import { db } from "../components/firebase.jsx";
import { getDoc, doc } from "firebase/firestore";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from '@mui/material';
import {Link as LinkR} from 'react-router-dom'
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip} from 'chart.js'

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip
)

const Stats = () => {

    const [cierres, setCierres] = useState([]);
    const [lastCierreCash, setLastCierreCash] = useState()
    const [lastCierreCashTables, setLastCierreCashTables] = useState()
    const [lastCierreCard, setLastCierreCard] = useState()
    const [lastCierreCardTables, setLastCierreCardTables] = useState()
    const [cashAmounts, setCashAmounts] = useState([])
    const [cardAmounts, setCardAmounts] = useState([])
    const [cardBills, setCardBills] = useState([])
    const [cashBills, setCashBills] = useState([])
    const [totalAmounts, setTotalAmounts] = useState([])
    const [dates, setDates] = useState([])
    const [finalDateMS, setFinalDateMS] = useState([])
    const [tableCashBills, setTableCashBills] = useState([])
    const [tableCashAmount, setTableCashAmount] = useState([])
    const [tableCardBills, setTableCardBills] = useState([])
    const [tableCardAmount, setTableCardAmount] = useState([])
    const [dateNow, setDateNow] = useState(new Date().toLocaleString());
    const [lastDate, setLastDate] = useState()

    const getCierres = async () => {
        const snapshot = await firebase.firestore().collection('cierres').get()
        setCierres(snapshot.docs.map(doc => doc.data()));
        setCardAmounts(snapshot.docs.map(doc => parseInt(doc.data().tarjeta).toFixed(2)))
        setCashAmounts(snapshot.docs.map(doc => parseInt(doc.data().efectivo).toFixed(2)))
        setTotalAmounts(snapshot.docs.map(doc => doc.data().total))
        setCashBills(snapshot.docs.map(doc => doc.data().cuentasEfectivo))
        setCardBills(snapshot.docs.map(doc => doc.data().cuentasTarjeta))
        setDates(snapshot.docs.map(doc => doc.data().fechaFinal))
        const fechas = (snapshot.docs.map(doc => parseInt(doc.data().fechaFinalMS)))
        console.log("dates...", fechas)
        const maxDate = Math.max(...fechas);
        const maxString = maxDate.toString();
        const docRef = doc(db, "cierres", maxString);
        const docSnap = await getDoc(docRef);
        setLastCierreCash(docSnap.data().efectivo.slice(0, -1))
        setLastCierreCard(docSnap.data().tarjeta.slice(0, -1))
        setLastCierreCashTables(docSnap.data().cuentasEfectivo)
        setLastCierreCardTables(docSnap.data().cuentasTarjeta)
        setFinalDateMS(maxDate);
        const parsedDate = new Date(maxDate).toLocaleString();
        setLastDate(parsedDate)
        const snapshot2 = await firebase.firestore().collection('facturas').get()
        if(snapshot2){
            const todayCashTables = [];
            const todayCashAmount = [];
            const todayCardAmount = [];
            const todayCardTables = [];
            snapshot2.forEach((doc) => {
                if(doc.id > maxDate && doc.data().metodoPago == "EFECTIVO"){
                    todayCashTables.push(doc.data());
                    todayCashAmount.push(doc.data().importe)
                }
                if(doc.id > maxDate && doc.data().metodoPago == "TARJETA"){
                    todayCardTables.push(doc.data());
                    todayCardAmount.push(doc.data().importe)
                }
            })
            const cashAmount = (todayCashAmount.reduce((a,b) => a+b, 0));
            const cardAmount = (todayCardAmount.reduce((a,b) => a+b, 0));
            setTableCashBills(todayCashTables.length)
            setTableCashAmount(cashAmount)
            setTableCardBills(todayCardTables.length)
            setTableCardAmount(cardAmount)
        }
    }

    useEffect(() => {
        getCierres();
    }, []);    
    
    /* console.log(cierres)
    console.log(cashAmounts)
    console.log(cardAmounts)
    console.log(cardBills)
    console.log(cashBills)
    console.log(totalAmounts)
    console.log(dates) */
    console.log(lastCierreCash)
    console.log(lastCierreCard)

    const data = {
        labels: dates,
        datasets: [{
            label: 'Cantidad Efectivo',
            data: cashAmounts,
            backgroundColor: 'blue',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        },{
            label: 'Cantidad Tarjeta',
            data: cardAmounts,
            backgroundColor: 'red',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        }]
    }

    const data2 = {
        labels: dates,
        datasets: [{
            label: 'Cuentas Efectivo',
            data: cashBills,
            backgroundColor: 'blue',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        },{
            label: 'Cuentas Tarjeta',
            data: cardBills,
            backgroundColor: 'red',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        }]
    }

    const data3 = {
        labels: [lastDate, dateNow],
        datasets: [{
            label: 'Cuentas Efectivo',
            data: [lastCierreCashTables, tableCashBills],
            backgroundColor: 'blue',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        },{
            label: 'Cuentas Tarjeta',
            data: [lastCierreCardTables, tableCardBills],
            backgroundColor: 'red',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        }]
    }

    const data4 = {
        labels: [lastDate, dateNow],
        datasets: [{
            label: 'Cantidad Efectivo',
            data: [lastCierreCash, tableCashAmount],
            backgroundColor: 'blue',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        },{
            label: 'Cantidad Tarjeta',
            data: [lastCierreCard, tableCardAmount],
            backgroundColor: 'red',
            pointRadius: 5,
            borderColor: 'black',
            pointBorderColor: 'gold',
            fill: true,
            tension: 0.4
        }]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                
            }
        }
    }

    const options2 = {
        scales: {
            y: {
                ticks: {
                    precision: 0
                }
            }
        }
    }

  return (
    <motion.div initial="out" animate="in" variants={animationFour} transition={transitionTwo}>
      <Section>
      <LinkR to="/"><Arrow><ArrowWhite /></Arrow></LinkR>
        <Row>
            <Column>
            <Title>NÚMERO DE CUENTAS (ÚLTIMOS CIERRES)</Title>
            <Chart>
                <Line
                    data={data2}
                    options={options2}
                ></Line>
            </Chart>
            </Column>
            <Column>
            <Title>ARQUEOS DE CAJA (ÚLTIMOS CIERRES)</Title>
            <Chart>
                <Line
                    data={data}
                    options={options}
                ></Line>
            </Chart>
            </Column>
        </Row>
        <Row>
            <Column>
            <Title>NÚMERO DE CUENTAS (HOY)</Title>
                <Chart>
                <Line
                    data={data3}
                    options={options2}
                ></Line>
                </Chart>
            </Column>
            <Column>
            <Title>ARQUEO DE CAJA (HOY)</Title>
            <Chart>
                <Line
                    data={data4}
                    options={options}
                ></Line>
            </Chart>
            </Column>
        </Row>
      </Section>
    </motion.div>
  )
}

export default Stats

const Row = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    border-bottom: 1px solid white;
`; 

const Column = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    width: 100%;
    height: 15%;
    display: grid;
    place-items: center;
    color: white;
    font-size: 24px;
`;

const Chart = styled.div`
    width: 100%;
    height: 85%;
    display: grid;
    place-items: center;
`;

const Arrow = styled(IconButton)`
    &&&{
        position: absolute;
        top: 50%;
        left: 10px;
        transform: scale(1.6);
        background: #a3a3a3;
        transform: translateY(-50%);
    }
`;

const ArrowWhite = styled(ArrowBackIosNewIcon)`
    &&&{
        color: white;
        transform: translateX(-1px);
    }
`;
