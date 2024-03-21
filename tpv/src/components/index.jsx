import styled from 'styled-components'
import  {motion} from 'framer-motion'
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import LogoBack from "../images/restLogo.png";
import TableBarIcon from '@mui/icons-material/TableBar';
import DeckIcon from '@mui/icons-material/Deck';
import wood from "../images/wood.jpg"
import paellas from "../images/paellas.jpg"
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EuroIcon from '@mui/icons-material/Euro';
import ClearIcon from '@mui/icons-material/Clear';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import EventNoteIcon from '@mui/icons-material/EventNote';

//**************CIERRES *********** */

export const CierreCaja = styled(ClosedCaptionIcon)`
  &&&{
    color: white;
  }
`;

export const SubTotal = styled(EventNoteIcon)`
  &&&{
    color: white;
  }
`;

export const CierresHeader = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5vh;
`;

export const DateTimeDiv = styled.div`
  width: 65%;
  height:40vh;
  display: flex;
`;

export const TableWrapper = styled.div`
  width: 80%;
  height: 70vh;
  display: grid;
  place-items: center;
  padding: 10px;
`;

export const ReportDisplay = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReportText = styled.div`
  width: 33%;
  height: 100%;
  display: grid;
  place-items: center;
  color: white;
  font-size: 24px;
`;


export const PickerTitle = styled.div`
  width: 100%;
  height: 15%;
  display: grid;
  place-items: center;
  color: white;
  font-size: 16px;
`;

export const PickerWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: grid;
  place-items: center;
  color: white;
  padding: 10px 10px;
`;

export const Card = styled(CreditCardIcon)`
&&&{
    color: white;
}
`;

export const BillText = styled.div`
width: 100%;
height: 30%;
display: grid;
place-items: center;
color: white;
font-size: 22px;
transform: translateY(20px);
`;

export const BigButton = styled(IconButton)`
&&&{
    transform: scale(3);
    border: 0.5px solid #a2a2a2;
}
`;

export const BillIcon = styled.div`
width: 100%;
height: 70%;
display: grid;
place-items: center;
`;

export const BillColumn = styled.div`
width: 30%;
height: 100%;
`;

export const BillRow = styled.div`
    width: 90%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 20px;
`;


export const BillButtons = styled.div`
width: 100%;
height: 80px;
display: flex;
align-items: center;
justify-content: space-around;
margin-bottom: 20px;
`;

export const Billpop = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;


// ********* HOME ***********


export const WhiteCross = styled(ClearIcon)`
&&&{
  color: #FF0000;
}   
`;

export const MenuTitleTwo = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(10px);
  h3{
    color: white;
    font-size: 24px;
  }
`;

export const IconRowText = styled.div`
  width: 100%;
  height: 30%;
  display: grid;
  place-items: center;
  color: white;
`;

export const IconRowRow = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconRowColumn = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const IconRowColumnTwo = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Euro = styled(EuroIcon)`
&&&{
    color: white;
    transform: translateX(-2px);
    
}
`;

export const Button = styled(IconButton)`
&&&{
  transform: scale(2.5);
  border: 0.5px solid #c2c2c2;
}
`;

export const Add = styled(PlaylistAddIcon)`
&&&{
    color: white;
}
`;

export const BigRow = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const BigRowTwo = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
`;

export const EmptyTableTitle = styled.div`
  width: 100%;
  height: 100px;
  color: orange;
  font-size: 64px;
  display: grid;
  place-items: center;
  text-transform: uppercase;
`;

export const NonEmptyTableTitle = styled.div`
  width: 100%;
  height: 250px;
  color: orange;
  font-size: 64px;
  display: grid;
  place-items: center;
  text-transform: uppercase;
  transform: translateY(-20px);
`;

export const HomeSection = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;
    display: flex;
    align-items: center;
    h1{
        color: white;
        font-size: 42px;
    }
`;

export const HeroSection = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        color: white;
        font-size: 42px;
    }
`;

export const Nav = styled(motion.div)`
    width: 100vw;
    height: 100px;
    backdrop-filter: blur(10px);
    background: rgb(0, 0, 0, 0.2);
    border-bottom: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 8000;
`;

export const IconWrapper = styled.div`
width: 100px;
height: 90px;
display: flex;
flex-direction: column;
`;

export const NavIcon = styled.div`
    width: 100%;
    height: 60px;
    display: grid;
    place-items: center;
`;

export const NavText = styled.div`
    width: 100%;
    height: 20px;
    display: grid;
    place-items: center;
    color: white;
    font-size: 16px;
`;

export const ArrowDown = styled(IconButton)`
  &&&{
    position: absolute;
    top: 15px;
    right: 20px;
    transform: scale(1.5);
    color: white;
    z-index: 9999;
    outline: none;
  }
`;

export const LinkIcon = styled(IconButton)`
    &&&{
        border: 1px solid #a2a2a2;
        border-radius: 50%;
        transform: scale(1.2);
        outline: none;
    }
`;

export const LeftColumn = styled.div`
    width: 25%;
    height: 100%;
    border-right: 1px solid white;
    display: flex;
    flex-direction: column;
`;

export const HalfColumn = styled.div`
    width: 100%;
    height: 40%;
    border-bottom: 1px solid white;
    display: flex;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 20%;
`;

export const CalcIconColumn = styled.div`
height: 100%;
width: 20%;
display: flex;
flex-direction: column;
`;

export const CalculatorIcon = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const BarIcon = styled(SportsBarIcon)`
  &&&{
    color: white;
    transform: scale(1.6);
  }
`;

export const BigHalf = styled.div`
    width: 100%;
    height: 60%;
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const RightColumn = styled.div`
    width: 75%;
    height: 100%;
    background-image: url(${LogoBack});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 50%;
`;

// ******* CALCULATOR ********

export const CalculatorWrapper = styled.div`
    width: 60%;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2.5%;
    border-radius: 10px;
`;

export const Numbers = styled.div`
    width: 100%;
    height: 80%;
    display: grid;
    border-radius: 0 0 10px 10px;
    place-items: center;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    background: #262626;
    padding: 5px;
    border: 1px solid white;
`;

export const AddTableIcon = styled(TableBarIcon)`
  &&&{
    color: white;
    transform: scale(1.6);
  }
`;

export const TerraceIcon = styled(DeckIcon)`
  &&&{
    color: white;
    transform: scale(1.6);
  }
`;

// ********* PRODUCTS ***********

export const ProductsHeader = styled.div`
    width: 100%;
    height: 20vh;
    display: flex;
`;

export const ProductsIconWrapper = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const ProductsIcon = styled.div`
    width: 100%;
    height: 90%;
    display: grid;
    place-items: center;
`;

export const AddProduct = styled(IconButton)`
    &&&{
        transform: scale(1.8) translateY(10px);
        cursor: pointer;
        outline: none;
    }
`;

export const ReturnIcon = styled(IconButton)`
    &&&{
        transform: scale(1.4);
        cursor: pointer;
        outline: none;
    }
`;

export const Left = styled(ChevronLeftIcon)`
&&&{
    color: white;
    transform: scale(1.2);
    outline: none;
}
`;

export const ProductsText = styled.div`
    width: 100%;
    height: 10%;
    color: white;
    font-size: 20px;
    text-align: center;
    transform: translateY(-10px);
`;

export const ProductsTitle = styled.div`
    width: 40%;
    height: 20vh;
    display: grid;
    place-items: center;
    color: white;
    font-size: 64px;
    transform: translateY(10px);
`;

export const AddIcon = styled(AddCircleOutlineIcon)`
    &&&{
        color: white;
        outline: none;
    }
`;

export const ProductsTable = styled.div`
    width: 85%;
    height: 80vh;
    padding: 20px;
    display: flex;
    align-items: center;
`;

export const item={
    exit:{
      opacity:0,
      height:0,
      transition:{
        ease:"easeInOut",
        duration:0.3,
        delay:1
      }
    }
  }
  

export const IconLine = styled.div`
    width: 100%;
    height: 10vh;
    display: grid;
    place-items: center;
`;

export const Times = styled(IconButton)`
&&&{
    color: white;
    transform: scale(1.8);
    outline: none;
    margin-left: 30px;
}
`;

export const PageTimes = styled(HighlightOffIcon)`
    &&&{
        color: white;
        transform: scale(1.8);
    }
`;


// ****** BARMENU ********

export const MenuSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${wood});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const MenuHeader = styled.div`
width: 100%;
height: 75px;
display: flex;
align-items: center;
`;

export const MenuTitle = styled.div`
  width: 100%;
  height: 50px;
  color: white;
  font-size: 28px;
  display: grid;
  place-items: center;
  margin-bottom: 50px;
`;

export const MenuTitleTop = styled.div`
  width: 100%;
  height: 100px;
  color: white;
  font-size: 64px;
  display: grid;
  place-items: center;
  text-transform: uppercase;
`;

export const Tables = styled.div`
    width: 95%;
    height: 175px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    place-items: center;
`;

export const Table = styled.div`
    height: 120px;
    width: 100px;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    margin: 0 5px;
    display: grid;
    place-items: center;
`;

export const Popover = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PopoverTwo = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-transform: uppercase;
    h1{
      font-size: 38px;
      color: white;
    }
`;

export const IconRow = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50px);
`;


export const Cross = styled(HighlightOffIcon)`
    &&&{
    color: red;
    transform: scale(2);
    margin: 30px;
    }   
`;

export const Check = styled(CheckCircleIcon)`
    &&&{
    color: green;
    transform: scale(2);
    margin: 30px;
    }
`;

// ********* FAMILY ******

export const FamilyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  grid-column-gap: 20px;
`;

export const Familia = styled(motion.div)`
    width: 130px;
    height: 40px;
    border: 1px solid #858585;
    margin-top: 10px;
    border-radius: 5px;
    background: #262626;
    display: flex;
    cursor: pointer;
`;

export const FamilyLogo = styled.div`
width: 30%;
height: 100%;
display: grid;
place-items: center;
`;

export const FamilyTitle = styled.div`
width: 70%;
height: 100%;
display: grid;
place-items: center;
color: white;
text-transform: uppercase;
font-size: 14px;
`;

export const PopoverProducts = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

export const AddRow = styled.div`
  width: 80%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
`;



export const AddDeleteRow = styled.div`
  width: 40%;
  height: 100px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const MenuTitleMedium = styled.div`
  width: 100%;
  height: 50px;
  color: white;
  font-size: 42px;
  display: grid;
  place-items: center;
 
`;

export const PopoverHeader = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
`;

export const PopoverHeaderTwo = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductsImage = styled.div`
  width: 100%;
  height: 20%;
  display: grid;
  place-items: center;
  margin-top: 30px;
`;

export const ProductsPopover = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

export const Families = styled.div`
  width: 65vw;
  height: auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FirstCell = styled.div`
  width: 5vw;
  display: grid;
  place-items: center;
`;

export const ProductMenuSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${paellas});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

// *********** BILL BISPLAY ******

export const BillDisplay = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
`;

export const BillWrapper = styled.div`
  width: 100%;
  max-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin-top: 10px;
`;

export const BillDisplaySmall = styled.div`
  width: 30%;
  height: 100%;
  display: grid;
  place-items: center;
  color: white;
  font-size: 18px;
`;

export const BillDisplayBig = styled.div`
  width: 40%;
  height: 100%;
  display: grid;
  place-items: center;
  color: white;
  font-size: 18px;
  border: 0.5px solid #c2c2c2;
  border-radius: 5px;
  text-transform: uppercase;
  margin: 5px 0;
`;

export const Image = styled.div`
  width: 15%;
  height: 35px;
  display: grid;
  place-items: center;
  border: 1px solid #a3a3a3;
  border-radius: 10px;
  background: black;
`;

export const Product = styled.div`
width: 95%;
height: 45px;
border: 0.5px solid #a3a3a3;
background: #666666;
display: flex;
align-items: center;
justify-content: space-around;
border-radius: 10px;
padding: 3px;
margin: 5px 0;
`;

export const Name = styled.div`
width: 65%;
display: flex;

white-space: nowrap;
overflow:hidden !important;
text-overflow: ellipsis;
h4{
    color: whitesmoke;
    font-size: 14px;
    transform: translateX(10px);
}
`;

export const Price = styled.div`
width: 10%;
display: flex;
h4{
    color: whitesmoke;
font-size: 14px;
transform: translateX(-5px);
}
`;

export const BillPrice = styled.div`
  width: 95%;
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

export const SendRow = styled.div`
  width: 40%;
  height: 100px;
  display: grid;
  place-items: center;
`;

// *********** PRODUCTS PAGE ******** FAMILIES PAGE ***********

export const Section = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
background: #101624;
`;

export const PageHeader = styled.div`
width: 100%;
height: 20vh;
display: flex;
`;

export const PageIconWrapper = styled.div`
width: 30%;
height: 100%;
display: flex;
flex-direction: column;
`;

export const CloseIconWrapper = styled.div`
width: 15%;
height: 100%;
display: flex;
flex-direction: column;
`;

export const CloseIconLineWrapper = styled.div`
width: 65%;
height: 100%;
display: flex;
align-items: center;
`;

export const PageIcon = styled.div`
width: 100%;
height: 90%;
display: grid;
place-items: center;
`;

export const ClosePageIcon = styled.div`
width: 100%;
height: 70%;
display: grid;
place-items: center;
`;

export const PageTitle = styled.div`
width: 40%;
height: 20vh;
display: grid;
place-items: center;
color: white;
font-size: 64px;
transform: translateY(10px);
`;

export const PageTable = styled.div`
width: 85%;
height: 80vh;
padding: 20px;
display: flex;
align-items: center;
`;

export const FamilyPageTable = styled.div`
width: 65%;
height: 80vh;
padding: 20px;
display: flex;
align-items: center;
`;

export const Text = styled.div`
width: 100%;
height: 10%;
color: white;
font-size: 20px;
text-align: center;
transform: translateY(-10px);
`;

export const CloseText = styled.div`
width: 100%;
height: 30%;
color: white;
font-size: 18px;
text-align: center;
`;

