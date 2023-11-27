import { useState, useEffect } from 'react';
import CardImageSection from './CardImageSection';
import CardDetailSection from './CardDetailSection';
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';

import ExpandedImage from './ExpandedImage';

const Card = (props) => {
    const { card, searchType } = props;
    const [loading, setLoading] = useState(false);
    const [attributes, setAttributes] = useState(null);
    const [display, setDisplay] = useState(false);
    const image_uris = card?.image_uris || card?.card_faces[0].image_uris
    const imgAttributes = {
        className: 'card-image',
        sizes: '80vw',
        alt: `${card.name} card image`
    }

    // setAttributes builds ExpandedImage component for each card 
    useEffect(() => {
        setAttributes({ ...imgAttributes });
    }, [])


    return (
        <>
            <ExpandedImage attributes={{ ...attributes, src: image_uris.normal }} layout={card.layout} display={display} setDisplay={(value) => setDisplay(value)} />
            <div className="card-container">
                <header className="card-header">
                    <h2 className="card-name">{card.name}</h2>
                </header>
                <div className="card-body" >
                    <CardImageSection attributes={{ ...attributes, src: image_uris.small }} setDisplay={(value) => setDisplay(value)} />
                    <CardDetailSection card={card} searchType={searchType} loading={loading} />
                </div>
                <footer className="card-footer">
                    {searchType === 'search-catalog' ? (
                        <CatalogCardFooter card={card} setLoading={(value) => setLoading(value)} />
                    ) :
                        searchType === 'search-collection' ? (
                            <CollectionCardFooter card={card} />
                        ) : (
                            <ApiCardFooter card={card} setLoading={(value) => setLoading(value)} />
                        )
                    }
                </footer>
            </div>
        </>
    )
}

export default Card;
