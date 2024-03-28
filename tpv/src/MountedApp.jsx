import React, {useState} from 'react'
import App from './App.jsx'
import { CartContext, NewCartContext, IdCurrentCategoryContext, OpenModalContext, ResetProductContext, StateScreenTabletContext, TotalOrderContext } from "./context/contexts";




const MountedApp = () => {

    const [screenIsOn, setScreenIsOn] = useState(true)
    const [idCurrentCategory, setIdCurrentCategory] = useState(1)
    const [cart, setCart] = useState([])
    const [newCart, setNewCart] = useState([])
    const [productToReset, setProductToReset] = useState(null);
    const [totalOrder, setTotalOrder] = useState(0)
    const [modalOpened, setModalOpened] = useState(0)

  return (
    <StateScreenTabletContext.Provider value={{screenIsOn, setScreenIsOn}}>
        <CartContext.Provider value={{cart, setCart}}>
            <NewCartContext.Provider value={{newCart, setNewCart}}>
                <ResetProductContext.Provider value={{productToReset, setProductToReset}}>
                    <TotalOrderContext.Provider value={{totalOrder, setTotalOrder}}>
                        <App />
                    </TotalOrderContext.Provider>
                </ResetProductContext.Provider>
            </NewCartContext.Provider>
        </CartContext.Provider>
    </StateScreenTabletContext.Provider>
  )
}

export default MountedApp