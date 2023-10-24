import React from 'react'

const CardImage = ({ card }) => {
    return (
        <>
            <img
                id="item-image"
                sizes="80vw"
                src={card.image_uris && card.image_uris.png}
                srcSet={`${card.image_uris.small} 500w, ${card.image_uris.normal} 775w, ${card.image_uris.large} 1600w`}
            />
        </>
    )
}

export default CardImage;
