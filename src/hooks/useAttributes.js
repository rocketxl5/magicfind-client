import { useState, useEffect } from 'react'
import cardBack from '../assets/img/mtg_card_back.jpg'
const useAttributes = (card) => {
    const [attributes, setAttributes] = useState({});
    // const image_uris = card?.image_uris?.small || card?.card_faces[0]?.image_uris?.small;

    useEffect(() => {
        setAttributes(
            {
                id: 'expand-card',
                style: 'card-image',
                src: card?.image_uris?.normal || card?.card_faces[0]?.image_uris?.normal,
                alt: `${card?.name}`,
                placeholder: cardBack
            }
        )
    }, [card]);

    return { attributes }
}

export default useAttributes