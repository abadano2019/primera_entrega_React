import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [contador, setContador] = useState(1);

  const removeProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };
  
  const addProduct = (item, cantidad) => {
    const element = cart.find((product) => product.id === item.id);

    if (!element) 
    { 
      setContador(1);
      return setCart([...cart, { ...item, cantidad }]);
    }
    
    const newCart = cart.map((product) => {
      if (product.id === item.id) {
        return { ...product, cantidad: product.cantidad + cantidad };
      }
      return product;
    });

    setCart(newCart);
    setContador(1);
  };

  const getTotal = () => cart.reduce((acc, product) => acc + product.precio * product.qty ,0)

  const getCartQuantity = () => cart.reduce((acc,product) => acc + product.cantidad , 0);

  const setCont = (count) =>{
    setContador(count)
  }

  const getContador = () => {
    return contador;
  }
  
  const value = {
    cart,
    addProduct,
    removeProduct,
    getCartQuantity,
    getTotal,
    contador,
    setCont,
    getContador,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};