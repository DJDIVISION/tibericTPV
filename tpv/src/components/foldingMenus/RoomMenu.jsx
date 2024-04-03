import React, {useState, useEffect, useContext, useRef} from 'react'
import { motion } from 'framer-motion'
import styled from "styled-components"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Icon, IconButton } from '@mui/material';
import {MenuSection, MenuSettingsIcon, SettingsWrapper, MenuTitleTop, item, CloseCaption, Popover, Header, IconRow, Cross,
Check} from "../index.jsx"
import { TableState } from '../../context/TableContext.jsx';
import { db } from "../../components/firebase.jsx";
import {  getFirestore, getDoc,  setDoc, doc, collection } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { CartContext, TotalOrderContext } from "../../context/contexts.jsx"
import { message, Modal, Button } from 'antd';
import TableAddIcon from '../../images/table-add-icon.png'
import TableDeleteIcon from '../../images/table-delete-icon.png'
import Draggable from "react-draggable";




const RoomMenu = ({setRoomMenuOpen, roomMenuOpen}) => {

    const [smallTables, setSmallTables] = useState([]);
    const [bigTables, setBigTables] = useState([]);
    const [smallPositions, setSmallPositions] = useState({});
    const [bigPositions, setBigPositions] = useState({});
    const nodeRef = useRef(null);
    const nodeRef2 = useRef(null);
    const [draggable, setDraggable] = useState(false);
    const [active, setActive] = useState("menuOne");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);

    const showTableModal = () => {
        setIsTableModalOpen(!isTableModalOpen);
    };

    const handleTableCancel = () => {
        showTableModal();
    };

    const Switch = () => {
        if(active === "menuOne"){
            setActive("menuTwo");
            showModal();
            setDraggable(true)
        } else if(active === "menuTwo"){
            setActive("menuOne");
            setDraggable(false)
        }
    }

    const showModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCancel = () => {
        showModal();
        Switch();
    };

    

    let animate = {};
    if(active === "menuOne") animate = { y: '100vh', display: 'none' };
    else if (active === "menuTwo") animate = {  position: 'absolute', top: 'calc(100vh - 60px)' };

    const transition = {
        type: 'tween',
        duration: 0.2
    };

    const getPositions = async () => {
        const snapshot = await firebase.firestore().collection('positions').get()
        if(snapshot.empty){
            setSmallTables([])
            setBigTables([])
            setSmallPositions([])
            setBigPositions([])
        } else {
            const smallTablesRef = doc(db, "positions", "roomSmallTables");
            const bigTablesRef = doc(db, "positions", "roomBigTables");
            const smallPositionsRef = doc(db, "positions", "roomSmallPositions");
            const bigPositionsRef = doc(db, "positions", "roomBigPositions");
            const smallTablesSnap = await getDoc(smallTablesRef);
            const bigTablesSnap = await getDoc(bigTablesRef);
            const smallPositionsSnap = await getDoc(smallPositionsRef);
            const bigPositionsSnap = await getDoc(bigPositionsRef);
            setSmallTables(smallTablesSnap.data().smallTables)
            setBigTables(bigTablesSnap.data().bigTables)
            setSmallPositions(smallPositionsSnap.data())
            setBigPositions(bigPositionsSnap.data())
        }
    }

    useEffect(() => {
        getPositions()
    }, [])

    const closeMenu = () => {
        setRoomMenuOpen(!roomMenuOpen)
    }

    const createDrag = () => {
        showTableModal();
        /* console.log(tables.length);
        const id = tables.length + 1;
        const name = "S" + id;
        const cl = "smalltable";
        setTables([...tables, name]); */
        
    }

    const removeDrag = async () => {
        /* console.log()
        console.log(tables)
        const popped = tables.slice(0, tables.length - 1);
        await setDoc(doc(db, "positions", "roomTables"), {
            popped
        });
        setTables(popped)
        console.log(positions)
        const updatedPositions = { ...positions };
        const keys = Object.keys(updatedPositions);
        if (keys.length > 0) {
            const lastKey = keys[keys.length - 1];
            delete updatedPositions[lastKey];
            await setDoc(doc(db, "positions", "roomPositions"), {
                ...updatedPositions
            });
            setPositions(updatedPositions)
    } */
        
        
    }

    async function handleStop(e, data) {
        let dummyPositions = { ...smallPositions };
        const itemId = e.target.id;
        dummyPositions[itemId] = {};
        dummyPositions[itemId]["x"] = data.x;
        dummyPositions[itemId]["y"] = data.y;
        setSmallPositions(dummyPositions);
        await setDoc(doc(db, "positions", "roomSmallPositions"), {
            ...dummyPositions
          });
        await setDoc(doc(db, "positions", "roomSmallTables"), {
        smallTables
        });
    }

    async function handleStopTwo(e, data) {
        let dummyPositions = { ...bigPositions };
        const itemId = e.target.id;
        dummyPositions[itemId] = {};
        dummyPositions[itemId]["x"] = data.x;
        dummyPositions[itemId]["y"] = data.y;
        setBigPositions(dummyPositions);
        await setDoc(doc(db, "positions", "roomBigPositions"), {
            ...dummyPositions
          });
        await setDoc(doc(db, "positions", "roomBigTables"), {
        bigTables
        });
    }

    console.log(smallTables.length);    
    console.log(bigTables.length);    
    //console.log(classes);   
    
    const setSingleTable = async () => {
        const i = smallTables.length + bigTables.length
        const id = i + 1;
        const name = "S" + id;
        setSmallTables([...smallTables, name]);
        showTableModal()
    }

    const setDoubleTable = () => {
        const i = smallTables.length + bigTables.length
        const id = i + 1;
        const name = "S" + id;
        setBigTables([...bigTables, name]);
        showTableModal()
    }

    const handleOk= () => {
        
    }

  return (
    <motion.div className="menu-container-four" variants={item}
          initial={{width:0,opacity:0, x: "25vw"}}
          animate={{width:"75vw", opacity:1}}
          transition={{duration:.5}}
          exit="exit">
                <MenuSection id="section">
                <CloseCaption onClick={closeMenu}><HighlightOffIcon /></CloseCaption>  
                <SettingsWrapper animate={animate} transition={transition}>
                <IcButton whileTap={{scale: 0.95}} onClick={() => createDrag()}><img src={TableAddIcon} alt="table" /></IcButton>
                <IcButtonRight whileTap={{scale: 0.95}} onClick={() => removeDrag()}><img src={TableDeleteIcon} alt="table" /></IcButtonRight>
                </SettingsWrapper>
                {smallTables.length === 0 ? <div></div>
                : smallTables.map((el) => {
                    return(
                        <Draggable
                        defaultPosition={
                            smallPositions === null
                              ? { x: 0, y: 0 }
                              : !smallPositions[el]
                              ? { x: 0, y: 0 }
                              : { x: smallPositions[el].x, y: smallPositions[el].y }
                          }
                        position={null}
                        grid={[25, 25]}
                        scale={1}
                        nodeRef={nodeRef}
                        key={el}
                        bounds="parent"
                        onStart={() => draggable}
                        //onDrag={this.handleDrag}
                        onStop={handleStop}
                        >
                        <Table ref={nodeRef} id={el} draggable={draggable}>{el}</Table>
                        </Draggable>
                    )
                })}
                {bigTables.length === 0 ? <div></div>
                : bigTables.map((el) => {
                    return(
                        <Draggable
                        defaultPosition={
                            bigPositions === null
                              ? { x: 0, y: 0 }
                              : !bigPositions[el]
                              ? { x: 0, y: 0 }
                              : { x: bigPositions[el].x, y: bigPositions[el].y }
                          }
                        position={null}
                        grid={[25, 25]}
                        scale={1}
                        nodeRef={nodeRef}
                        key={el}
                        bounds="parent"
                        onStart={() => draggable}
                        //onDrag={this.handleDrag}
                        onStop={handleStopTwo}
                        >
                        <BigTable ref={nodeRef} id={el} draggable={draggable}>{el}</BigTable>
                        </Draggable>
                    )
                })}
                <IcButtonAbsolute onClick={Switch}><MenuSettingsIcon /></IcButtonAbsolute>
                <Modal title="¡Modo edición de Sala!" open={isModalOpen} onOk={showModal} onCancel={handleCancel}>
                    <p>Ha accedido al modo de edición de Sala.</p>
                    <p>En este modo puede añadir, eliminar y arrastrar</p>
                    <p>mesas para recrear su sala en el TPV.</p>
                </Modal>
                <Modal
                    open={isTableModalOpen}
                    title="Elige el tamaño de la mesa"
                    onOk={handleOk}
                    onCancel={handleTableCancel}
                    footer={[
                    <Button key="back" size="large" type="primary" onClick={setSingleTable}>
                        Mesa sencilla
                    </Button>,
                    <Button key="submit" type="primary" size="large" onClick={setDoubleTable}>
                        Mesa doble
                    </Button>,
                    ]}
                >
                </Modal>
                </MenuSection>
    </motion.div>
  )
}

export default RoomMenu

const IcButton = styled(motion.div)`
    &&&{
        width: 80px;
        height: 100%;
        display: grid;
        place-items: center;
        cursor: pointer;
        margin: 0 10px;
        img{
            width: 50%;
            display: block;
            object-fit: cover;
        }
    }
`;

const IcButtonRight = styled(motion.div)`
    &&&{
        width: 80px;
        height: 100%;
        display: grid;
        place-items: center;
        cursor: pointer;
        img{
            width: 50%;
            display: block;
            object-fit: cover;
        }
    }
`;

const IcButtonAbsolute = styled(IconButton)`
    &&&{
        position: absolute;
        top: 92%;
        right: 30px;
        transform: scale(1.4);
    }
`;

const Table = styled.div`
    width: 100px;
    height: 100px;
    position: absolute;
    cursor: ${({ draggable }) => (draggable ? "move" : "pointer")} !important;
    border: 0.5px solid goldenrod;
    border-radius: 5px;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    padding: 5px;
`;

const BigTable = styled.div`
    width: 150px;
    height: 100px;
    position: absolute;
    cursor: ${({ draggable }) => (draggable ? "move" : "pointer")} !important;
    border: 0.5px solid goldenrod;
    border-radius: 5px;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    padding: 5px;
`;
