import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";

export default function ProductComponent() {

    const products = useSelector((state) => state.allProducts.products);
    const renderList = products.map((product) => {
        const { id, producto, cantidad, precio, imagen, familia } = product;
        return(
            <Overlayer>
            <Card animate={{opacity: 1}}
                    initial={{opacity: 0}}
                    exit={{opacity: 0}}
                    onClick={() => setAddProductsMenu(!addProductsMenu)}
                    whileTap={{scale: 0.975}}
                    key={product.id}
                    >
                        <Picture style={{backgroundImage: `url(${product.imagen})`, backgroundPosition: "center",
                    backgroundSize: 'cover', backgroundRepeat: "no-repeat"}}></Picture>
                        <Text>{product.producto}</Text>
                        <Text style={{fontSize: "14px"}}>{(product.precio)}€</Text>
            </Card>
    </Overlayer>
        );
    });

    return <>{renderList}</>;
}

const Overlayer = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 140px;
`;

const Card = styled(motion.div)`
  width: 200px;
  height: 140px;
  border: 0.5px solid goldenrod;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 5px;
`;

const Picture = styled.div`
    width: 95%;
    height: 60%;
    display: grid;
    place-items: center;
    border-radius: 5px;
`;

const Text = styled.div`
    height: 20%;
    width: 95%;
    transform: translateY(5px);
    white-space: nowrap;
    overflow:hidden !important;
    text-overflow: ellipsis;
    text-align: center;
    h1{
        color: white;
        font-size: 12px;
        
    }
`;
