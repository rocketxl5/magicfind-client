import { createContext, useEffect, useReducer } from 'react';
import { cartReducer } from '../features/product/services/cartReducer';

const initialState = {
  cartItems: [],
  error: null,
  itemsCount: 0,
  subTotal: 0,
}

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const {
    subTotal,
    itemsCount,
    cartItems
  } = state || {};

  useEffect(() => {
    // If cart is set in localStorage
    if (localStorage.getItem('cart')) {
      // Parse cart object
      const parsedCart = JSON.parse(localStorage.getItem('cart'));
      dispatch({
        type: 'set-cart',
        payload: parsedCart
      })

    }
  }, []);

  useEffect(() => {
    if (cartItems.length) {
      const items = cartItems.reduce((accumulator, currentItem) =>
        accumulator + currentItem.quantity
        , 0);
      const total = cartItems?.reduce((accumulator, currentItem) =>
        accumulator + currentItem.quantity * parseFloat(currentItem.selected?.price)
        , 0);

      dispatch({
        type: 'update-cart',
        payload: {
          itemsCount: items,
          subTotal: total.toFixed(2)
        }
      })

      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    else {
      localStorage.removeItem('cart');
      dispatch({
        type: null
      })
    }
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        dispatch,
        subTotal,
        itemsCount,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}