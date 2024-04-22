import axios from 'axios';
import { useState } from 'react';
import useCart from './contexthooks/useCart';
// import useFetchData from './useFetchData';
import { api } from '../api/resources';

const useUpdateCart = (url, headers, item, indexFound = undefined) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [quantityAvailable, setQuantityAvailable] = useState(0);
    // const [showConfirmation, setShowConfirmation] = useState(false);

    const { dispatch, cartItems } = useCart();

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
                    if (res.status === 200 && res.data.isAvailable) {
                        // Update cart quantities
                        updateCart(quantity);
                        setQuantityAvailable(res.data.quantity);
                    }
                    else if (!res.data.quantity) {
                        // Pass zero to delete item
                        updateCart(0);
                        setCurrentStatus({
                            isAvailable: false,
                            message: `${item.selected.name} is not available anymore`
                        });
                    }
                    else {
                        updateCart(res.data.quantity);
                        setCurrentStatus({
                            isAvailable: true,
                            message: `Quantities available have changed`
                        });
                        setQuantityAvailable(res.data.quantity);
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
                    // setShowConfirmation(true);
                    // setTimeout(() => {
                    //     setShowConfirmation(false);
                    // }, 1500);
                    setLoading(false); 
                })
    }
    return { error, loading, quantityAvailable, currentStatus, updateCartHandler };
}

export default useUpdateCart
