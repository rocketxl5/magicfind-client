import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const items = cartItems.reduce((accumulator, currentItem) =>
      accumulator + currentItem.quantity
      , 0)
    const total = cartItems.reduce((accumulator, currentItem) =>
      accumulator + currentItem.quantity * currentItem.selected.price
      , 0)

    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // Update SubTotal state
    setSubTotal(total)
    // Update ItemsCount state
    setItemsCount(items);
  }, [cartItems]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items?.length > 0) {
      setCartItems(items);
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
