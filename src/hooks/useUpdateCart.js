import { useState } from 'react';
import axios from 'axios';
import useCart from './contexthooks/useCart';
import { api } from '../api/resources';

const useUpdateCart = (url, headers, item, index = undefined) => {
    const [loading, setLoading] = useState(false);
    const { dispatch, cartItems } = useCart();

    const updateCart = (quantity) => {
        // Clone cartItems array to trigger cartItems state change @ CartContext
        const items = [...cartItems];

        // If index is defined [product is in cart]
        if (index !== undefined) {
            console.log(index)
            // Update product quantity
            items[index].quantity = quantity;
        }
        else {
            // Else add item in cart [new item]
            items.push({ selected: item, quantity: quantity });
        }
        // Update cart reducer @ CartContext
        dispatch({
            type: 'success',
            payload: {
                cartItems: items              
            }
        });
    }

    // Check if product quantity selected is available
    const updateCartHandler = (e) => {
        e.stopPropagation();

        // Parse string value
        const quantitySelected = parseInt(e.target.value);
        // If quantity is greater than zero
        if (quantitySelected > 0) {
            // Set loader
            setLoading(true);
            axios.get(`${api.serverURL}${url}${quantitySelected}`, headers)
                .then(res => {
                    // If quantity selected is available
                    if (res.status === 200 && res.data.isAvailable) {
                        // Update cart quantities
                        updateCart(quantitySelected);
                    }
                })
                .catch((error) => {
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
    }
    return { loading, updateCartHandler };
}

export default useUpdateCart
