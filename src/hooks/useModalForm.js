import { useEffect, useReducer, useRef } from 'react';
import { storeItemReducer } from '../features/product/services/storeItemReducer';
import { deckItemReducer } from '../features/product/services/deckItemReducer';
import useAxios from './useAxios';
import useAuth from './contexthooks/useAuth';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    // reference to collection object
    ref: '',
    name: '',
    price: '',
    quantity: '',
    condition: '',
    language: '',
    comment: '',
    created: Date.now(),
    updated: [],
    catalogId: '',
    isPublished: false,
    isSubmit: false,
    isUpdated: false,
    isValid: false,
    isNewProduct: false,
}

const useModalForm = (product) => {
    const [state, dispatch] = useReducer(storeItemReducer, initialState);

    const { auth } = useAuth();

    const { post, patch, error, loading, response } = useAxios();

    useEffect(() => {
        console.log(product)
        // Product already exists. 
        // Set state values.
        if (product.catalogId) {
            dispatch({
                type: 'set-form',
                payload: { ...product }
            })
        }
        else {
            // Set isNewProduct state to true.
            // Set reference to product id.
            // Set catalogId
            handleNewProduct(true, product.card_id, product.name);
        }
    }, [product])

    useEffect(() => {
        if (state.isValid) {
            // Remove unnecessary props
            const { isSubmit, isUpdated, isValid, isNewProduct, ...rest } = state;
            if (state.isNewProduct) {
                console.log('new product')
                post(auth.token, `/api/users/store/${auth.user.id}`, rest);
            }
            else {
                console.log('existing product')
                patch(auth.token, `/api/users/store/${auth.user.id}/${rest.catalogId}`, rest);
            }
        }
    }, [state.isValid])

    const btnRef = useRef(null);

    function handlePrice(price) {
        dispatch({
            type: 'price',
            payload: parseFloat(price)
        });
    }

    function handleNewProduct(isNew, id, name) {
        dispatch({
            type: 'new-product',
            payload: {
                ref: id,
                catalogId: uuidv4(),
                name: name,
                isNewProduct: isNew
            }
        });
    }

    function handleQuantity(quantity) {
        console.log(quantity)
        dispatch({
            type: 'quantity',
            payload: parseInt(quantity)
        });
    }

    function handleCondition(condition) {
        dispatch({
            type: 'condition',
            payload: condition
        });
    }

    function handleLanguage(language) {
        dispatch({
            type: 'language',
            payload: language
        });
    }

    function handleComment(comment) {
        dispatch({
            type: 'comment',
            payload: comment
        });
    }
    function handlePublished(published) {
        dispatch({
            type: 'published',
            payload: published
        });

    }

    function handleSubmit(submit) {
        dispatch({
            type: 'submit',
            payload: submit
        });
    }

    function handleUpdated(updated) {
        dispatch({
            type: 'updated',
            payload: updated
        });
    }

    function handleIsValid(isValid) {
        dispatch({
            type: 'valid',
            payload: isValid
        });
    }

    return {
        handlePrice,
        handleQuantity,
        handleCondition,
        handleLanguage,
        handleComment,
        handlePublished,
        handleSubmit,
        handleUpdated,
        handleIsValid,
        loading,
        state,
        btnRef
    }
}

export default useModalForm
