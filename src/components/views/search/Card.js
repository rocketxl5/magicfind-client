import { useState, useEffect } from 'react';
import CardImageSection from './CardImageSection';
import CardDetailSection from './CardDetailSection';
import ExpandedImage from './ExpandedImage';

const Card = (props) => {
    const { index, card, searchType } = props;
    const [attributes, setAttributes] = useState(null);
    const [display, setDisplay] = useState(false);
    const imgAttributes = {
        className: 'card-image',
        sizes: '80vw',
        alt: `${card.name} card image`
    }

    // setAttributes builds ExpandedImage component for each card 
    useEffect(() => {
        setAttributes({ ...imgAttributes, src: card.image_uris.normal });
    }, [])

    return (
        <>
            <ExpandedImage attributes={{ ...attributes, src: card.image_uris.normal }} display={display} setDisplay={(value) => setDisplay(value)} />
            <div id={`card-${index}`} key={card.id} className="card-container">
                <div className="card-body" >
                    <CardImageSection attributes={{ ...attributes, src: card.image_uris.small }} setDisplay={(value) => setDisplay(value)} />
                    <CardDetailSection card={card} searchType={searchType} />
                </div>
            </div>
        </>
    )
}

export default Card;
