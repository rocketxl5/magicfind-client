import { useState, useEffect, createElement } from 'react'

const useExpandImages = (collections) => {
    const [expandedImages, setExpandedImages] = useState([]);

    useEffect(() => {
        if (collections) {
            const elements = []
            collections.forEach((cards, i) => {
                elements.push([])
                cards.forEach((card) => {
                    if (
                        card.layout === 'transform' ||
                        card.layout === 'modal_dfc' ||
                        card.layout === 'double_faced_token' ||
                        card.layout === 'reversible_card' ||
                        card.layout === 'art_series'
                    ) {
                        // Double faced card
                        const element = card.card_faces.map((card_face, i) => {
                            return createElement('img', {
                                key: { i },
                                className: 'modal-image',
                                layout: card.layout,
                                src: card_face.image_uris.normal,
                                alt: `${card.name} image`,
                            })
                        })
                        elements[i].push({ layout: card.layout, element })
                    }
                    else {
                        // Single faced card
                        const element = createElement('img', {
                            className: 'modal-image',
                            layout: card.layout,
                            src: card.image_uris.normal,
                            alt: `${card.name} image`,
                        })

                        elements[i].push({ layout: card.layout, element })
                    }
                })
            })
            setExpandedImages(elements);
            // console.log(collections)
        }
    }, [collections]);

    return { expandedImages }
}

export default useExpandImages
