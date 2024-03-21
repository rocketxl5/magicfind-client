import { useState } from 'react';
import axios from 'axios';
import useCart from './contexthooks/useCart';
import { api } from '../api/resources';

const useUpdateCart = (url, headers, product, index = undefined) => {
    const [loading, setLoading] = useState(false);
    const { dispatch, cartItems } = useCart();

    const updateCart = (quantity) => {
        // Clone cartItems array to trigger cartItems state change @ CartContext
        const items = [...cartItems];

        if (index !== undefined) {
            console.log(index)
            items[index].quantity = quantity;
        }
        else {
            items.push({ selected: product, quantity: quantity });
        }
        dispatch({
            type: 'success',
            payload: {
                quantitySelected: quantity,
                cartItems: items
            }
        });
    }

    const updateCartHandler = (e) => {
        e.stopPropagation();

        const quantitySelected = parseInt(e.target.value);
        if (quantitySelected > 0) {
            setLoading(true);
            axios.get(`${api.serverURL}${url}${quantitySelected}`, headers)
                .then(res => {
                    if (res.status === 200 && res.data.isAvailable) {
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
