import React, {useState} from 'react'
import styled from 'styled-components';
import {Nav, IconWrapper, ArrowDown, NavIcon, NavText, LinkIcon} from "./index.jsx"
import {Link} from 'react-router-dom'
import AddHomeIcon from '@mui/icons-material/AddHome';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function NavBar() {

    const [active, setActive] = useState("menuOne");

    const Switch = () => {
        if(active === "menuOne"){
            setActive("menuTwo");
        } else if(active === "menuTwo"){
            setActive("menuOne");
        }
    }

    let animate = {};
    if(active === "menuOne") animate = { y: '-70px', display: 'none' };
    else if (active === "menuTwo") animate = {  position: 'absolute', top: 0 };
    
    if(active === "menuThree") animateTableMenu = {  left: '25vw', top: 0};
    else if (active === "menuFour") animateTableMenu = { left: '100vw'};

    const transition = {
        type: 'tween',
        duration: 0.2
    };

    const icon = active === "menuOne" ? <ArrowDown onClick={Switch}><ExpandCircleDownIcon/></ArrowDown> : <ArrowDown onClick={Switch}><ArrowUp/></ArrowDown>

  return (
    <>
    <Nav animate={animate} transition={transition}>
        <Link to="/products"><IconWrapper><NavIcon><LinkIcon><ProductIcon /></LinkIcon></NavIcon><NavText>PRODUCTOS</NavText></IconWrapper></Link>
        <Link to="/families"><IconWrapper><NavIcon><LinkIcon><FamilyIcon /></LinkIcon></NavIcon><NavText>FAMILIAS</NavText></IconWrapper></Link>
    </Nav> 
    {icon}
    </>
  )
}

const ArrowUp =  styled(ExpandCircleDownIcon)`
  transform: rotate(180deg);
`;

const ProductIcon = styled(AddHomeIcon)`
    &&&{
        color: white;
    }
`;

const FamilyIcon = styled(GroupAddIcon)`
    &&&{
        color: white;
    }
`;

