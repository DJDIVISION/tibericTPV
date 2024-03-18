import React, {useEffect, useState} from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, TextField } from "@mui/material";
import { row } from 'mathjs';
import { Formik } from "formik";
import { tokens } from "./theme.jsx";
import styled from "styled-components"
import {Link as LinkR} from "react-router-dom";
import {motion} from "framer-motion"
import { Avatar, IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {  message } from 'antd';
import axios from 'axios'
import { animationFour, transitionTwo } from "../animations";
import { useSelector } from "react-redux";
import { db, v9db, imageDB } from "../components/firebase.jsx";
import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
import {  getFirestore, setDoc,  updateDoc, doc, collection, addDoc, deleteDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { Section, PageHeader, AddProduct, PageIconWrapper, PageIcon, PageTitle, FamilyPageTable, IconLine, PageTimes,
item } from '../components/index.jsx';

const Products = () => {

    const [families, setFamilies] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [imgUrl, setImgUrl] = useState([]);
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const [familia, setFamilia] = useState("");
    const [imagen, setImagen] = useState("");
    const [data, setData] = useState({});
    const [per, setPerc] = useState(null);
    const storage = getStorage();
    const theme = useTheme();
    const [formValues, setFormValues] = useState([]);
    const colors = tokens(theme.palette.mode);
    
    const fetchFamilies = async () => {
      const snapshot = await firebase.firestore().collection('familias').get()
      console.log(snapshot.docs.map(doc => doc.data()));
      setFamilies(snapshot.docs.map(doc => doc.data()));
    };

    useEffect(() => {
        fetchFamilies();
    }, []);

    useEffect(() => {
        if(families){
            families.forEach(fam => {
                const storageRef = ref(storage, "families/" + fam.imagen);
                const url = getDownloadURL(storageRef);
                setImgUrl(url);
                console.log(imgUrl);
            })
        }
    }, [])

    console.log(imgUrl);
    const openMenuHandler = () => {
        setOpenMenu(!openMenu);
    }

    const handleFormSubmit = async () => {
        const id = (families.length + 1).toString();
        const imageRef = ref(imageDB, `familias/${imagen.name}`);
        try{
            await uploadBytesResumable(imageRef, imagen).then(() => {
                getDownloadURL(imageRef).then(async (downloadURL) => {
                    await setDoc(doc(db, "familias", id), {
                        id: id,
                        familia: familia,
                        photoURL: downloadURL
                    })
                })
            })
        } catch (err) {
            console.log(err);
        }

      

        openMenuHandler();
        message.success("Familia añadida con éxito!",[1]);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }

      const columns = [
        { field: 'id', headerName: 'ID', width: '150' },
        {
            field: "imagen",
            headerName: "IMAGEN",
            width: 150,
            renderCell: (params) => (
                <Avatar alt="Image" src={params.row.photoURL} sx={{ width: 40, height: 40 }} />
              ),
          },
        { field: 'familia', headerName: 'FAMILIA', width: '300' },
        {
          field: "EDITAR",
          headerName: "EDITAR",
          width: '150',
          renderCell: (cellValues) => (
              <IconButton onClick={(event) => {
                handleEdit(event, cellValues);
              }}><EditIcon /></IconButton>
            ),
        },
        {
            field: "ELIMINAR",
            headerName: "ELIMINAR",
            width: '150',
            renderCell: (cellValues) => (
              <IconButton onClick={(event) => {
                handleClick(event, cellValues);
              }}><DeleteIcon /></IconButton>
              ),
          },

    ]
    
  return (
    <motion.div initial="out" animate="in" variants={animationFour} transition={transitionTwo}>
    <Section>
        <PageHeader>
        <PageIconWrapper><PageIcon><LinkR to="/"><AddProduct><Left /></AddProduct></LinkR></PageIcon><Text>VOLVER</Text></PageIconWrapper>
        <PageTitle>FAMILIAS</PageTitle>
        <PageIconWrapper><PageIcon><AddProduct onClick={openMenuHandler}><AddIcon /></AddProduct></PageIcon><Text>AÑADIR FAMILIA</Text></PageIconWrapper>
        </PageHeader>
        <FamilyPageTable>
        <DataGrid rows={families} columns={columns} getRowId={(row) => row.photoURL} key={row.familia} slots={{ toolbar: GridToolbar }} 
    sx={{
        boxShadow: 2,
        border: 2,
        width: '50%',
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
        </FamilyPageTable>
        {openMenu && (
             <motion.div className="menu-container-three" variants={item}
             initial={{width:0,opacity:0}}
             animate={{width:"100vw", opacity:1}}
             transition={{duration:.5}}
             exit="exit">
                <div className="smartcontainer">
                <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}}
                 transition={{delay:.4}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.3
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <IconLine><IconButton onClick={openMenuHandler}><PageTimes /></IconButton></IconLine></motion.div>
                <Box
              display="flex"
              flexDirection="column"
              width="60vw"
            >
              <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}}
                 transition={{delay:.7}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.6
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Familia"
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={(e) => setFamilia(e.target.value.toUpperCase())}
                name="familia"
                inputProps={{
                  style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white"}
                }}
                InputLabelProps={{
                    style: { color: "white" },
                  }}
              /></motion.div>
              <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}}
                 transition={{delay:.8}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.7
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <TextField
                fullWidth
                variant="outlined"
                type="file"
                label="Imagen"
                
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={(e) => setImagen(e.target.files[0])}
                name="file"
                accept="image/*"
                inputProps={{
                    style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white"}
                  }}
                InputLabelProps={{
                    style: { color: "white", marginTop:"-20px" },
                }}
              /></motion.div>
            </Box>
            <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}}
                 transition={{delay:.9}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.8
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Button color="secondary" variant="contained" /* type="submit" */ onClick={handleFormSubmit} style={{marginTop: "10px"}}>
                Crear familia
              </Button></motion.div>
                </div>
            </motion.div>
        )}
        </Section>
        </motion.div>
  )
}

export default Products

const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid grey;
  display: grid;
  place-items: center;
  img{
    display: block;
    width: 50%;
    object-fit: cover;
  }
`;













const Text = styled.div`
    width: 100%;
    height: 10%;
    color: white;
    font-size: 20px;
    text-align: center;
    transform: translateY(-10px);
`;





const AddIcon = styled(AddCircleOutlineIcon)`
    &&&{
        color: white;
    }
`;




const Left = styled(ChevronLeftIcon)`
    &&&{
        color: white;
        transform: scale(1.2);
    }
`;