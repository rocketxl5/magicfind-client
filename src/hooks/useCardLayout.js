import { useState } from 'react';
import { formatLayout } from '../features/modal/services/formatLayout';

const useCardLayout = () => {
    const [cardsLayout, setCardsLayout] = useState(null);

    const loadLayouts = (cards) => {
        console.log(cards)
        setCardsLayout(cards.map(res => res.map(obj => formatLayout(obj.layout))));
    }

    return { cardsLayout, loadLayouts }
}

export default useCardLayout
