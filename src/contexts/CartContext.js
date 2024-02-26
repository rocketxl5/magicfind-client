import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : null
  );
  const [itemsCount, setItemsCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {

    const items = cartItems?.reduce((accumulator, currentItem) =>
      accumulator + currentItem.quantity
      , 0)
    const total = cartItems?.reduce((accumulator, currentItem) =>
      accumulator + currentItem.quantity * parseFloat(currentItem.selected?.price)
      , 0)

    // Update SubTotal state
    setSubTotal(total.toFixed(2))
    // Update ItemsCount state
    setItemsCount(items);


    // console.log(cartItems.length)
    if (cartItems) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    else {
      localStorage.removeItem('cart');
    }
    //   setHasChanged(false)
    // }
  }, [cartItems]);


  useEffect(() => {
    const isCart = localStorage.getItem('cart');
    if (isCart) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      setCartItems(cart);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        itemsCount,
        setItemsCount,
        subTotal,
        setSubTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
