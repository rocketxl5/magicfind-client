import { createContext, useEffect, useReducer } from 'react';
import { cartReducer } from '../features/cart/cartReducer';

const initialState = {
  isAvailable: false,
  error: null,
  price: 0,
  cartItem: null,
  itemsCount: 0,
  index: null,
  cartItems: [],
  quantityAvailable: 0,
  quantitySelected: 0,
  total: 0,
  subTotal: 0,
}

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const {
    index,
    total,
    price,
    subTotal,
    itemsCount,
    cartItems,
    isLoading,
    isAvailable,
    quantitySelected,
    quantityAvailable
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
    if (cartItems) {
      const items = cartItems?.reduce((accumulator, currentItem) =>
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

      if (cartItems.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
      else {
        localStorage.removeItem('cart');
      }
    }
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        dispatch,
        index,
        price,
        total,
        subTotal,
        itemsCount,
        cartItems,
        isLoading,
        isAvailable,
        quantitySelected,
        quantityAvailable
      }}
    >
      {children}
    </CartContext.Provider>
  )
}