import { useState } from 'react';
import useSearch from './contexthooks/useSearch';

const useProductMatch = () => {
    const [isMatch, setIsMatch] = useState(false);
    const { cardCollection } = useSearch();

    const isProductMatch = (product) => {
        const match = cardCollection.find((card) => {
            return card.id === product.id;
        })

        if (match) {
            setIsMatch(true);
        }
    }
    return { isProductMatch, isMatch };
}

export default useProductMatch
