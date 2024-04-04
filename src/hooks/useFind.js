import { useState } from 'react';
import useCart from './contexthooks/useCart';
import useSearch from './contexthooks/useSearch';

const useFind = () => {
    const [indexFound, setIndexFound] = useState(null);
    const [isMatchFound, setIsMatchFound] = useState(false);

    const { cartItems } = useCart();
    const { cardCollection } = useSearch();

    const findMatch = (product) => {
        // @ArchiveItem @CollectionItem
        // Returns boolean value
        // Returns true if product item is in collection
        // Returns false if it's not
        if (cardCollection.length > 0) {
            const match = cardCollection.find((card) => {
                return card.id === product.id;
            })

            if (match) {
                setIsMatchFound(true);
            }
        }
    }

    // Returns the index of product item if found
    // Returns null if not
    // @ CatalogItem
    const findIndex = (id) => {

        if (cartItems.length > 0) {
            const index = cartItems.findIndex((item) => {
                return item.selected._id === id;
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
