import { useState, useEffect, createElement } from 'react'

const useExpandImages = (collections) => {
    const [expandedImages, setExpandedImages] = useState([]);

    useEffect(() => {

        if (collections) {
            const elements = []
            collections.forEach((collection, i) => {
                elements.push([])
                collection.forEach((card) => {
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
                                className: 'slide-image',
                                name: 'slide-image',
                                motion: 'turn',
                                src: card_face.image_uris.normal,
                                alt: `${card.name} image`,
                            })
                        })
                        elements[i].push(element)
                    }
                    else if (card.layout === 'split' ||
                        card.layout === 'planar') {
                        const element = createElement('img', {
                            className: 'slide-image',
                            name: 'slide-image',
                            motion: 'rotate',
                            src: card.image_uris.normal,
                            alt: `${card.name} Card Image`,
                        })

                        elements[i].push(element)

                    }
                    else if (card.layout === 'flip') {
                        const element = createElement('img', {
                            className: 'slide-image',
                            name: 'slide-image',
                            motion: 'flip',
                            src: card.image_uris.normal,
                            alt: `${card.name} Card Image`,
                        })

                        elements[i].push(element)

                    }
                    else {
                        // Single faced card
                        const element = createElement('img', {
                            className: 'slide-image',
                            name: 'slide-image',
                            motion: 'static',
                            src: card.image_uris.normal,
                            alt: `${card.name} Card Image`,
                        })

                        elements[i].push(element)
                    }
                })
            })
            setExpandedImages(elements);
        }
    }, [collections]);

    return { expandedImages }
}

export default useExpandImages