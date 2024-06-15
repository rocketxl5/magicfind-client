import { useState, useEffect } from 'react'

const useCardLayout = (cardLayout) => {
    const [layout, setLayout] = useState('');

    const handleLayout = (layout) => {
        switch (layout) {
            case 'flip':
                setLayout('flip');
                break;
            case 'split':
            case 'planar':
                setLayout('split');
                break;
            case 'transform':
            case 'modal_dfc':
            case 'reversible_card':
            case 'double_faced_token':
            case 'art_series':
                setLayout('reversible');
                break;
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
                setLayout('normal');
                break;
        }
    }


    useEffect(() => {
        if (cardLayout) {
            handleLayout(cardLayout)
        }
    }, [cardLayout])


    return { layout }
}

export default useCardLayout
