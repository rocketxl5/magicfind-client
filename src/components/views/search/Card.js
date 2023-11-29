import { useState, useEffect } from 'react';
import CardImageSection from './CardImageSection';
import CardDetailSection from './CardDetailSection';
import DeleteCard from './DeleteCard';
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';

import Loading from '../../layout/Loading';

import ExpandedImage from './ExpandedImage';

const Card = (props) => {
    const { card, searchType } = props;
    const [loading, setLoading] = useState(false);
    const [attributes, setAttributes] = useState(null);
    const [expandedImageOvelay, setExpandedImageOvelay] = useState(false);
    const [deleteCardOverlay, setDeleteCardOverlay] = useState(false);
    const image_uris = card?.image_uris || card?.card_faces[0].image_uris
    const imgAttributes = {
        className: `card-image ${!expandedImageOvelay ? 'b-radius-10' : 'b-radius-15'}`,
        sizes: '80vw',
        src: image_uris.small,
        alt: `${card.name} Image`
    }

    // setAttributes builds ExpandedImage component for each card 
    useEffect(() => {
        console.log(expandedImageOvelay)
        if (expandedImageOvelay) {

            setAttributes({ ...imgAttributes });
        }
    }, [expandedImageOvelay])

    useEffect(() => {
        if (deleteCardOverlay) {
            setAttributes({ ...imgAttributes })
        }
    }, [deleteCardOverlay])
    return (
        <>
            <ExpandedImage attributes={{ ...attributes, src: image_uris.normal }} expandedImageOvelay={expandedImageOvelay} setExpandedImageOvelay={(value) => setExpandedImageOvelay(value)} />
            <DeleteCard attributes={{ ...attributes }} card={card} deleteCardOverlay={deleteCardOverlay} setDeleteCardOverlay={(value) => setDeleteCardOverlay(value)} />
            <div className="card-container">
                <header className="card-header">
                    <h2 className="card-name">{card.name}</h2>
                </header>
                <section className="card-body" >
                    <CardImageSection attributes={{ ...attributes, src: image_uris.small }} setExpandedImageOvelay={(value) => setExpandedImageOvelay(value)} />
                    <CardDetailSection card={card} searchType={searchType} loading={loading} />
                </section>
                <footer className="card-footer">
                    {searchType === 'search-catalog' ? (
                        <CatalogCardFooter card={card} setLoading={(value) => setLoading(value)} />
                    ) :
                        searchType === 'search-collection' ? (
                            <CollectionCardFooter card={card} deleteCardOverlay={deleteCardOverlay} setDeleteCardOverlay={(value) => setDeleteCardOverlay(value)} />
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
