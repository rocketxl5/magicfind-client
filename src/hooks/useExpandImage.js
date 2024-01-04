import { useState, useEffect } from 'react'

const useExpandImage = (card) => {
    console.log(card)
    const [expandedImage, setExpandedImage] = useState(null);

    // Create expanded image component
    // card state passed in dependency array
    // to update images from location (navigate) state @ DeletedCard  & SearchComponents
    useEffect(() => {
        const image_uris = card?.image_uris || card?.card_faces[0].image_uris;
        // Single faced card
        if (!card.card_faces?.length) {
            setExpandedImage(
                document.createElement('img', {
                    id: 'reduce-card',
                    className: 'card-image b-radius-20',
                    src: image_uris.normal,
                    alt: `${card.name} image`,
                })
            );
        } else {
            // Double faced card [Transform]
            setExpandedImage(
                card.card_faces.map((card_face) => {
                    return document.createElement('img', {
                        id: 'reduce-card',
                        className: 'card-image b-radius-20',
                        src: card_face.image_uris.normal,
                        alt: `${card.name} image`,
                    })
                })
            )
        }
    }, [card]);
    useEffect(() => { console.log(expandedImage) }, [expandedImage])
    return expandedImage
}

export default useExpandImage
