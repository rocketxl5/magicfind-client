import { useState } from 'react';
import useAxios from './useAxios';
import useSearch from './contexthooks/useSearch';
import { api } from '../api/resources';
import { trimProduct } from '../features/product/services/trimProduct';

const useResponseHandler = () => {
    const [loading, setLoading] = useState(false);
    const [isCardAdded, setIsCardAdded] = useState(false);
    const { setUpdateCollection } = useSearch();

    const { fetch, patch, post, response, error } = useAxios();

    const handleFetch = (oracleId, token) => {
        const url = `${api.serverURL}/api/cards/product/${oracleId}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        }
        setLoading(true);

        fetch(url, config);

    }

    const handleGetResponse = (response, product, auth) => {
        const { isSet } = response;
        const { token, user } = auth;
        // If product does not exist
        if (!isSet) {
            // Add it to site cards library
            post(
                token,
                '/api/cards/add/product',
                trimProduct(product, 'cards')
            );
        }
        else {
            // Add returned product from fetch to current user's collection
            const { product } = response;
            patch(
                token,
                `/api/users/${user.id}/add/card`,
                trimProduct(product, 'users')
            );
        }
    }

    const handlePostResponse = (response, auth) => {
        const { isSet, product } = response;
        const { token, user } = auth;

        if (isSet) {
            patch(
                token,
                `/api/users/${user.id}/add/card`,
                trimProduct(product, 'users')
            );
        }
    }

    const handlePatchResponse = (response, auth) => {
        const { isSet, product } = response;
        const { token, user } = auth;
        if (isSet) {
            patch(
                token,
                `/api/cards/modify/${product._id}`,
                user
            );
        }
    }

    const handleUpdate = (response) => {
        const { isSet } = response;

        if (isSet) {
            setLoading(false);
            setIsCardAdded(true);
            setUpdateCollection(true);
        }
    }

    return { handleGetResponse, handlePatchResponse, handlePostResponse, handleUpdate, handleFetch, loading, response, error, isCardAdded }
}

export default useResponseHandler
