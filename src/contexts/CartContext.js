import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  // const getCart = (cartName) => {
  //   return JSON.parse(localStorage.getItem(cartName));
  // }

  // useEffect(() => {
  //   if (itemsCount) {
  //     localStorage.setItem('cart', JSON.stringify(itemsCount));
  //   }
  // }, [itemsCount]);

  useEffect(() => {


    // localStorage.setItem('cart', JSON.stringify(cartItems));
    // let quantity = 0;
    // const cart = getCart('cart');

    // if (cart) {
    //   cart?.items.forEach((item) => {
    //     quantity += parseInt(item.quantity_selected);
    //   });
    // } else {
    //   return;
    // }

    // setItemsCount(quantity);

    // if (cartItems.length > 0) {
    //   cart.items = cartItems;
    //   localStorage.setItem('cart', JSON.stringify(cart));
    // }
  }, [cartItems]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart)
    if (cart) {
      setCartItems(cart);
      setItemsCount(cart.length);
    }
    else {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // console.log('hello')
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        itemsCount,
        setItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
