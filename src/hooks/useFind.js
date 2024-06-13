import { useState } from 'react';
import useCartContext from './contexthooks/useCartContext';
import useSearchContext from './contexthooks/useSearchContext';

const useFind = () => {
    // index || null
    const [indexFound, setIndexFound] = useState(null);
    // true || false
    const [isMatchFound, setIsMatchFound] = useState(false);

    const { cartItems } = useCartContext();
    const { cardCollection } = useSearchContext();

    const findMatch = (card_id) => {
        // console.log(product)
        // console.log(cardCollection)
        if (cardCollection.length > 0) {

            const match = cardCollection.find((id) => {
                return id === card_id;
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
