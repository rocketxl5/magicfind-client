import { useState, useEffect, createElement } from 'react'

const useExpandImage = (card) => {
    const [expandedImage, setExpandedImage] = useState(false);

    useEffect(() => {
        if (card) {
            // console.log(card)
            const image_uris = card?.image_uris || card?.card_faces[0].image_uris;
            // Single faced card
            if (
                card.layout === 'transform' ||
                card.layout === 'modal_dfc' ||
                card.layout === 'double_faced_token' ||
                card.layout === 'reversible_card' ||
                card.layout === 'art_series'
            ) {
                // Double faced card
                setExpandedImage(
                    card.card_faces.map((card_face) => {
                        return createElement('img', {
                            id: 'reduce-card',
                            className: 'modal-image',
                            src: card_face.image_uris?.normal,
                            alt: `${card.name} image`,
                        })
                    })
                )
            }
            else {
                setExpandedImage(
                    createElement('img', {
                        id: 'reduce-card',
                        className: 'modal-image',
                        src: image_uris.normal,
                        alt: `${card.name} image`,
                    })
                );

            }
        }
    }, [card]);

    return { expandedImage }
}

export default useExpandImage
