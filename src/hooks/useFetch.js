import { useState, useReducer } from 'react';
import axios from 'axios';
import { cartState } from '../features/cart/cartState';
import { cartReducer } from '../features/cart/cartReducer';

const useFetch = () => {
// const [data, setData] = useState(null);
// const [error, setError] = useState(null);
// const [loading, setLoading] = useState(false);


    const [state, dispatch] = useReducer(cartReducer, cartState);

    const fetchData = async (url, headers) => {
        // setLoading(true);
        dispatch({
            type: 'loading'
        })
        await axios
            .get(url, headers)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: 'loaded',
                    payload: res.data.isAvailable,
                })
                // setData(res.data);
            })
            .catch((error) => {
                dispatch({
                    type: 'error',
                    payload: {
                        isLoading: false,
                        error: error.message,
                    }
                })
            })
        // .finally(() => {
        //     setLoading(false);
        // })
    }

    return { fetchData }
}

export default useFetch
