import { useState, useEffect, createElement } from 'react'

const useExpandImage = (card) => {
    const [expandedImage, setExpandedImage] = useState(false);

    useEffect(() => {
        if (card) {
            let image;
            // Single faced card
            if (
                card.layout === 'transform' ||
                card.layout === 'modal_dfc' ||
                card.layout === 'double_faced_token' ||
                card.layout === 'reversible_card' ||
                card.layout === 'art_series'
            ) {
                // Double faced card
                image = card.card_faces.map((card_face) => {
                    return (
                        createElement('img', {
                            className: 'modal-image',
                            motion: 'turn',
                            src: card_face.image_uris?.normal,
                            alt: `${card.name} image`,
                        }))
                })

            }
            else if (
                card.layout === 'split' ||
                card.layout === 'planar') {
                image = createElement('img', {
                    className: 'modal-image',
                    name: 'modal-image',
                    motion: 'rotate',
                    src: card.image_uris.normal,
                    alt: `${card.name} Card Image`,
                })
            }
            else if (card.layout === 'flip') {
                image = createElement('img', {
                    className: 'modal-image',
                    name: 'modal-image',
                    motion: 'flip',
                    src: card.image_uris.normal,
                    alt: `${card.name} Card Image`,
                })
            }
            else {
                image = createElement('img', {
                    className: 'modal-image',
                    name: 'modal-image',
                    motion: 'static',
                    src: card.image_uris.normal,
                    alt: `${card.name} Card Image`,
                })
            }
            setExpandedImage(image);
        }
    }, [card]);

    return { expandedImage }
}

export default useExpandImage
