import { useState, useEffect } from 'react'
import cardBack from '../assets/img/mtg_card_back.jpg'
const useAttributes = (card) => {
    const [attributes, setAttributes] = useState({});
    const image_uris = card?.image_uris?.small || card?.card_faces[0]?.image_uris?.small;
    useEffect(() => {
        console.log(image_uris)
        console.log(card.layout)
        setAttributes(
            {
                id: 'expand-card',
                style: 'card-image b-radius-10',
                src: image_uris,
                alt: `${card.name} image`,
                placeholder: cardBack
            }
        )
    }, [card]);

    return { attributes }
}

export default useAttributes