import axios from 'axios';
import { useState } from 'react';
import useCart from './contexthooks/useCart';
// import useFetch from './useFetch';
import { FaRegTimesCircle } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import { api } from '../api/resources';

const useUpdateCart = (url, headers, item, indexFound = undefined) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quantityAvailable, setQuantityAvailable] = useState(0);

    const { dispatch, cartItems, setCartUpdate, cartUpdate } = useCart();

    const Update = ({ children }) => {
        return (
            <>{children}</>
        )
    }

    const updateCart = (quantity) => {
        // Cart is not empty
        if (cartItems.length) {
            // Clone cartItems array
            // Note: empty cart is not iterable [can't be destructured]
            const items = [...cartItems];
            // If quantity is zero
            if (quantity === 0) {
                items.splice(indexFound, 1);
                dispatch({
                    type: 'delete-item',
                    payload: items
                })
            }
            else {
                // If indexFound is defined [product already in cart]
                if (indexFound !== null) {

                // Update product quantity
                    items[indexFound].quantity = quantity;
                }
                else {
                    // Else add item in cart [new item]
                    items.push({ selected: item, quantity: quantity });
                }
                // Update cart reducer @ CartContext
                dispatch({
                    type: 'set-cart',
                    payload: items
                });
            }
        }
        // Cart is empty
        else {
            dispatch({
                type: 'set-cart',
                payload: [{ selected: item, quantity: quantity }]
            })
        }
    }

    // Check if product quantity selected is available
    // Receives an integer as argument [quantitySelected]
    // @ QuantitySelector component
    // @ CollectionItem component [delete button]
    const updateCartHandler = (quantity) => {

        setLoading(true);

        axios.get(`${api.serverURL}${url}${quantity}`, headers)
            .then(res => {
                    // If quantity selected is available
                    if (res.data.isAvailable) {
                        // Update cart quantities
                        updateCart(quantity);
                        setQuantityAvailable(res.data.quantity);
                    }
                    else if (!res.data.isAvailable && res.data.quantity > 0) {
                        updateCart(res.data.quantity)
                        setQuantityAvailable(res.data.quantity);
                        setCartUpdate([...cartUpdate, <Update><p><span><BsExclamationCircle className='warning-icon' /></span> <span>{`${item.selected.name}`}</span></p></Update>])
                    }
                    else {
                        updateCart(0);
                        setCartUpdate([...cartUpdate, <Update><p><span><FaRegTimesCircle className='danger-icon' /></span> <span>{`${item.selected.name}`}</span> </p></Update >])
                    } 
                })
                .catch((error) => {
                    setError(error.message)
                    dispatch({
                        type: 'error',
                        payload: {
                            error: error.message
                        }
                    });
                })
            .finally(() => {
                    setLoading(false); 
                })
    }
    return { error, loading, quantityAvailable, updateCartHandler };
}

export default useUpdateCart
