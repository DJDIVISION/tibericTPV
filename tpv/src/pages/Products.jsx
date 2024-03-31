import React, {useEffect, useState} from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { Box, Button, TextField } from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
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
import { animationFour, transitionTwo } from "../animations";
import { db, imageDB } from "../components/firebase.jsx";
import {  getFirestore, setDoc,  updateDoc, doc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
import firebase from 'firebase/compat/app';
import { Section, PageHeader, AddProduct, PageIconWrapper, PageIcon, PageTitle, PageTable, IconLine, PageTimes,
item, Text } from '../components/index.jsx';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [families, setFamilies] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [openEditMenu, setOpenEditMenu] = useState(false);
    const [producto, setProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [familia, setFamilia] = useState("");
    const [imagen, setImagen] = useState("");
    const [data, setData] = useState([]);
    const theme = useTheme();
    const [formValues, setFormValues] = useState([]);
    const colors = tokens(theme.palette.mode);
    
    const fetchProducts = async () => {
      const snapshot = await firebase.firestore().collection('productos').get()
      setProducts(snapshot.docs.map(doc => doc.data()));
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchFamilies = async () => {
      const snapshot = await firebase.firestore().collection('familias').get()
      const fam = [];
      snapshot.forEach((doc) => {
        fam.push(doc.data().familia);
      })
      setFamilies(fam);
    };

    useEffect(() => {
        fetchFamilies();
    }, []);

    console.log(families);

    const handleClick = async (event, cellValues) => {
      const id = (cellValues.id).toString();
      console.log(cellValues);
      const res = await db.collection('productos').doc(id).delete();
      console.log(res);
      message.success("Producto eliminado con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      /* if(window.confirm("Seguro que quieres borrar el producto?")){
        const id = cellValues.id;
        axios.delete(`http://localhost:9000/api/products/deleteproducts/${id}`);
        message.success("Producto eliminado con éxito!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } */
    }

    useEffect(() => {
      console.log(data);
    }, [data]);

    useEffect(() => {
      console.log(formValues.producto);
    }, [formValues]);

    const handleEdit = (event, cellValues) => {
      const item = products.filter(el => el.id == cellValues.row.id);
      setData(item[0]);
      setOpenEditMenu(!openEditMenu);
    }

    const openMenuHandler = () => {
        setOpenMenu(!openMenu);
    }

    const openEditMenuHandler = () => {
      setOpenEditMenu(!openEditMenu);
  }



    const columns = [
        { field: 'id', headerName: 'ID', width: '150' },
        {
            field: "imagen",
            headerName: "IMAGEN",
            width: 150,
            renderCell: (params) => (
                <Avatar alt="Image" src={params.row.imagen} sx={{ width: 40, height: 40 }} />
              ),
          },
        { field: 'producto', headerName: 'PRODUCTO', width: '250' },
        { field: 'precio', headerName: 'PRECIO', width: '150' },
        { field: 'familia', headerName: 'FAMILIA', width: '200' },
        {
          field: "EDITAR",
          headerName: "EDITAR",
          renderCell: (cellValues) => (
              <IconButton onClick={(event) => {
                handleEdit(event, cellValues);
              }}><EditIcon /></IconButton>
            ),
        },
        {
            field: "ELIMINAR",
            headerName: "ELIMINAR",
            renderCell: (cellValues) => (
              <IconButton onClick={(event) => {
                handleClick(event, cellValues);
              }}><DeleteIcon /></IconButton>
              ),
          },

    ]

    const handleEditFormSubmit = async (e) => {
      console.log(typeof formValues.precio);
      console.log(formValues.producto);
      const id = (data.id);
      const strId = (data.id).toString();
      console.log(id);

      const dbRef = collection(db, "productos");
      const updateRef = doc(dbRef, strId)
      const updateData = await updateDoc(updateRef, {producto: formValues.producto, precio: formValues.precio, familia: formValues.familia});
      if(updateData){
        message.error("SHIIIIIITTTTT!!!!");
      } else {
        message.success("Productado editado con éxito!");
      }
      console.log(res);
      openEditMenuHandler();
      message.success("Producto Editado!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  }

    const handleFormSubmit = async () => {
      const imagePath = imagen.name; 
      const id = (products.length + 1).toString();
      const imageRef = ref(imageDB, `productos/${imagePath}`);
      try{
        await uploadBytesResumable(imageRef, imagen).then(() => {
            getDownloadURL(imageRef).then(async (downloadURL) => {
                await setDoc(doc(db, "productos", id), {
                    id: id,
                    producto: producto,
                    precio: precio,
                    familia: familia,
                    imagen: downloadURL
                })
            })
            openMenuHandler();
            message.success("Producto añadido con éxito!",[1]);
            setTimeout(() => {
              window.location.reload();
            }, 500);
              })
    } catch (err) {
        console.log(err);
    }
      
      
    }

    const initialValues = {
      producto: data.producto,
      precio: data.precio,
      familia: data.familia,
      imagen: data.imagen,
      id: data.id
    };
    
  return (
    <motion.div initial="out" animate="in" variants={animationFour} transition={transitionTwo}>
    <Section>
        <PageHeader>
        <PageIconWrapper><PageIcon><LinkR to="/"><AddProduct><Left /></AddProduct></LinkR></PageIcon><Text>VOLVER</Text></PageIconWrapper>
        <PageTitle>PRODUCTOS</PageTitle>
        <PageIconWrapper><PageIcon><AddProduct onClick={openMenuHandler}><AddIcon /></AddProduct></PageIcon><Text>AÑADIR PRODUCTO</Text></PageIconWrapper>
        </PageHeader>
        <PageTable>
        <DataGrid rows={products} columns={columns} getRowId={(row) => row.id} key={row.producto} slots={{ toolbar: GridToolbar }} 
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
    sx={{
        boxShadow: 2,
        border: 2,
        width: '70%',
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
        </PageTable>
        
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
                 transition={{delay:.5}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.4
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Producto"
                
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={(e) => setProducto(e.target.value.toUpperCase())}
                name="producto"
                inputProps={{
                  style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white" }
                }}
                InputLabelProps={{
                    style: { color: "white" },
                  }}
              /></motion.div>
              <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}}
                 transition={{delay:.6}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.5
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                
                label="Precio"
                
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={(e) => setPrecio(e.target.value.toString())}
                name="precio"
                inputProps={{
                  style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white", step: "0.5"}
                }}
                InputLabelProps={{
                    style: { color: "white" },
                  }}
              /></motion.div>
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
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Familia</InputLabel>
              <Select
              
                variant="outlined"
                type="text"
                label="Familia"
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={(e) => setFamilia(e.target.value.toUpperCase())}
                name="familia"
                inputProps={{
                  style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white"}
                }}
              >
                {families.map((el) => {
                  return(
                    <MenuItem value={el}>{el}</MenuItem>
                  )
                })}
              </Select>
              </FormControl>
              </motion.div>
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
                //error={!!touched.file && !!errors.file}
                //helperText={touched.file && errors.file}
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
                Crear producto
              </Button></motion.div>
                </div>
            </motion.div>
        )}

{openEditMenu && (
             <motion.div className="menu-container-three" variants={item}
             initial={{width:0,opacity:0}}
             animate={{width:"100vw", opacity:1}}
             transition={{duration:.5}}
             exit="exit">
                <div className="smartcontainer">
                <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}}
                 transition={{delay:.6}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.5
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <IconLine><IconButton onClick={openEditMenuHandler}><PageTimes /></IconButton></IconLine></motion.div>
                <Formik
                    onSubmit={handleEditFormSubmit}
                    initialValues={initialValues}
                >
                    {({
          values,
          handleChange,
          errors,
          touched,
          handleBlur,
        }) => (
          <form onSubmit={handleEditFormSubmit}>
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
                label="Producto"
                onBlur={handleBlur} 
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={handleChange}
                name="producto"
                value={values.producto}
                inputProps={{
                  style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white" }
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
                type="text"
                
                label="Precio"
                onBlur={handleBlur}
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={handleChange}
                name="precio"
                value={(values.precio).toString()}
                inputProps={{
                  style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white", step: "0.5"}
                }}
                InputLabelProps={{
                    style: { color: "white" },
                  }}
              /></motion.div>
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
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Familia"
                sx={{border: '1px solid white', margin: '20px 0'}}
                onBlur={handleBlur}
                onChange={handleChange}
                name="familia"
                value={values.familia}
                inputProps={{
                  style:{ fontFamily: "Quicksand", textTransform: "uppercase", color: "white"}
                }}
                InputLabelProps={{
                    style: { color: "white" },
                  }}
              /></motion.div>
            </Box>
            <motion.div initial={{y:100,opacity:0}} animate={{y:0, opacity:1}}
                 transition={{delay:1}}
                 exit={{
                  opacity:0,
                  y:90,
                    transition:{
                      ease:"easeInOut",
                      delay:0.9
                    }
                 }} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Button color="secondary" variant="contained" type="submit" onClick={setFormValues(values)} style={{marginTop: "10px"}}>
                Editar producto
              </Button></motion.div>
            
          </form>
        )}
                </Formik>
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