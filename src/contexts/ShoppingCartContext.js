import React, { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (itemsCount) {
      localStorage.setItem('shopping-cart-items', JSON.stringify(itemsCount));
    }
  }, [itemsCount]);

  useEffect(() => {
    let quantity = 0;
    cartItems.forEach((item) => {
      quantity += parseInt(item.quantity_selected);
    });

    setItemsCount(quantity);

    if (cartItems.length > 0) {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (localStorage.getItem('shopping-cart')) {
      setCartItems(JSON.parse(localStorage.getItem('shopping-cart')));
      setItemsCount(JSON.parse(localStorage.getItem('shopping-cart-items')));
    }
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, setCartItems, itemsCount, setItemsCount }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
