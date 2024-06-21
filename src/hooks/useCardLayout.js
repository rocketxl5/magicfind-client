// Standardized layout strings
// Takes and array of layouts
import { useState, useEffect } from 'react'

const useCardLayout = () => {
    const [cardLayouts, setCardLayouts] = useState(null);
    const [cardLayout, setCardLayout] = useState(null);
    const [layout, setLayout] = useState(null);
    const [layouts, setLayouts] = useState(null);


    const handleLayout = (layout) => {
        switch (layout) {
            case 'flip':
                return 'flip';
            case 'split':
            case 'planar':
                return 'split';
            case 'transform':
            case 'modal_dfc':
            case 'reversible_card':
            case 'double_faced_token':
            case 'art_series':
                return 'reversible';
            default:
                //   case 'normal':
                //   case 'leveler':
                //   case 'class':
                //   case 'saga':
                //   case 'meld':
                //   case 'adventure':
                //   case 'mutate':
                //   case 'prototype':
                //   case 'scheme':
                //   case 'token':
                //   case 'emblem':
                //   case 'augment':
                //   case 'host':
                //   case 'vanguard':
                return 'normal'
        }
    }

    useEffect(() => {
        if (cardLayouts) {
            // console.log(cardLayouts)
            setLayouts(
                cardLayouts.map(cardLayout => handleLayout(cardLayout))
            )
        }
        if (cardLayout) {
            setLayout(handleLayout(cardLayout))
        }
    }, [cardLayouts, cardLayout])


    return { layout, layouts, setCardLayouts, setCardLayout }
}

export default useCardLayout