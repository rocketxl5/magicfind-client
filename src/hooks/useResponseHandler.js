import { useState } from 'react';
import useAxios from './useAxios';
import useSearchContext from './contexthooks/useSearchContext';
import { trimProduct } from '../features/product/services/trimProduct';
import { api } from '../api/resources';

const useResponseHandler = () => {
    const [loading, setLoading] = useState(false);
    const [isAdded, setIsCardAdded] = useState(false);

    const { setUpdateCollection } = useSearchContext();
    const { fetch, patch, post, response, error } = useAxios();

    const handleFetch = (id, token) => {
        const url = `${api.serverURL}/api/cards/product/${id}`;

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
        console.log(response)
        // If product does not exist
        if (!isSet) {
            // Add it to site cards library
            post(
                token,
                '/api/cards/add/product',
                product
            );
        }
        else {
            // Add returned product from fetch to current user's collection
            const { product } = response;

            patch(
                token,
                `/api/users/${user.id}/add/card`,
                trimProduct({ type: 'user', product })
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
                trimProduct({ type: 'user', product })
            );
        }
    }

    const handlePatchResponse = (response, auth) => {
        const { isSet, product } = response;
        const { token, user } = auth;
        console.log(product)
        if (isSet) {
            patch(
                token,
                `/api/cards/update/owners/${product.ref}`,
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

    return { handleGetResponse, handlePatchResponse, handlePostResponse, handleUpdate, handleFetch, loading, response, error, isAdded }
}

export default useResponseHandler
