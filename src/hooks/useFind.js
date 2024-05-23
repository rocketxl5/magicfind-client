import { useState } from 'react';
import useCart from './contexthooks/useCart';
import useSearch from './contexthooks/useSearch';

const useFind = () => {
    // index || null
    const [indexFound, setIndexFound] = useState(null);
    // true || false
    const [isMatchFound, setIsMatchFound] = useState(false);

    const { cartItems } = useCart();
    const { cardCollection } = useSearch();

    const findMatch = (product) => {
        console.log(product)
        console.log(cardCollection)
        if (cardCollection.length > 0) {

            const match = cardCollection.find((id) => {
                return id === product.id;
            })

            if (match) {
                setIsMatchFound(true);
            }
        }
    }

    // Returns the index of product item if found
    // Returns null if not
    // @ CatalogItem
    const findIndex = (product) => {
        if (cartItems.length > 0) {
            const index = cartItems.findIndex((item) => {
                return item.selected.publishedID === product.publishedID;
            });
            // If index >= 0: Product is already in cart
            if (index > -1) {
                setIndexFound(index);
            }
            else {
                setIndexFound(null);
            }
        }
    }
    return { findMatch, isMatchFound, findIndex, indexFound };
}

export default useFind
