import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { Avatar, IconButton, useTheme, TextField, Button } from '@mui/material';
import styled from "styled-components"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { tokens } from "../../pages/theme.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TableState } from '../../context/TableContext.jsx';
import {FamilyWrapper, ProductsIconWrapper, MenuTitle, FamilyLogo, FamilyTitle, IconRow, Header, MenuTitleTop, Cross, Check, item, Times, PopoverProducts, MenuHeader} from "../index.jsx"
import axios from 'axios';
import firebase from 'firebase/compat/app';

const Family = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {activeFamily, setActiveFamily} = TableState();
    const [active, setActive] = useState(false);
    const [openAddFamily, setOpenAddFamily] = useState(false);
    const [openDeleteFamily, setOpenDeleteFamily] = useState(false);
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");
    const [families, setFamilies] = useState([]);

    const fetchProducts = async () => {
      const snapshot = await firebase.firestore().collection('familias').get()
      setFamilies(snapshot.docs.map(doc => doc.data()));
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    

    
    

  return (
    <Section>
        <FamilyWrapper>
            {families.map((el) => {
                return(
                    <Familia onClick={() => {setActiveFamily(el.familia); setActive(true)}} whileTap={{scale: 0.95}} key={el.id}>
                        <FamilyLogo>
                        <Avatar alt="Image" src={el.photoURL} sx={{ width: 30, height: 30 }} />
                        </FamilyLogo>
                        <FamilyTitle>{el.familia}</FamilyTitle>
                    </Familia>
                )
            })}
        </FamilyWrapper>
        {/* <ProductsIconWrapper>
        <IconButton onClick={closeMenu} sx={{border: "1px solid #858585", transform: "translateY(-5px)"}}><Add /></IconButton>
        <IconButton sx={{border: "1px solid #858585", transform: "translateY(5px)"}}><Delete /></IconButton>
        </ProductsIconWrapper>
        {openAddFamily && (
            <motion.div className="menu-container-three" variants={item}
            initial={{opacity:0, height: 0, x: "-80px", y: "-5px"}}
            animate={{ opacity:1, height: "100vh"}}
            transition={{duration:.5}}
            exit="exit">
                <PopoverProducts>
                
                <MenuHeader>
                    <Times onClick={closeMenu}><HighlightOffIcon /></Times>  
                </MenuHeader>
                  <MenuTitle>QUIERES AÑADIR UNA FAMILIA?</MenuTitle>
                  <form onSubmit={handleFormSubmit}>
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
                label="Nombre"
                sx={{border: '1px solid white', margin: '20px 0'}}
                onChange={(e) => setNombre(e.target.value.toUpperCase())}
                name="nombre"
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
              />
                 </motion.div>
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
                    <Button color="secondary" variant="contained" type="submit" onClick={upload} style={{marginTop: "10px"}}>
                Crear familia
              </Button>
                 </motion.div>
                  </form>
                 
                </PopoverProducts>
            </motion.div>
        )} */}
    </Section>
  )
}

export default Family

const Add = styled(AddCircleOutlineIcon)`
    &&&{
        color: white;
    }
`;

const Delete = styled(DeleteIcon)`
    &&&{
        color: red;
    }
`;

const Section = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    border: 1px solid #858585;
    border-radius: 5px;
    background: #0c101b;
`;

const Familia = styled(motion.div)`
    width: 130px;
    height: 40px;
    border: 1px solid #858585;
    margin: 5px 0;
    border-radius: 5px;
    background: #262626;
    display: flex;
    cursor: pointer;
`;

const Logo = styled.div`
    width: 30%;
    height: 100%;
    display: grid;
    place-items: center;
`;

const Title = styled.div`
    width: 70%;
    height: 100%;
    display: grid;
    place-items: center;
    color: white;
    text-transform: uppercase;
    font-size: 14px;
`;
