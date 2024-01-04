import { useState, useEffect, createElement, forwardRef } from 'react';
import CardImageSection from './CardImageSection';
import CardDetailSection from './CardDetailSection';
import card_back from '../../../assets/img/card_back.jpg'
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';


const Card = forwardRef(function Card(props, ref) {
    const { card, searchType, handleClick } = props;
    const [loading, setLoading] = useState(false);
    const [ExpandedCard, setExpandedCard] = useState(null);

    const image_uris = card?.image_uris || card?.card_faces[0].image_uris;
    const imgAttributes = {
        id: 'expand-card',
        style: 'card-image b-radius-10',
        src: image_uris.small,
        alt: `${card.name} image`,
        placeholder: card_back
    }

    // Create expanded image component
    // card state passed in dependency array
    // to update images from location (navigate) state @ DeletedCard  & SearchComponents
    useEffect(() => {
        // Single faced card
        if (!card.card_faces?.length) {
            setExpandedCard(
                createElement('img', {
                    id: 'reduce-card',
                    className: 'card-image b-radius-20',
                    src: image_uris.normal,
                    alt: `${card.name} image`,
                })
            );
        } else {
            // Double faced card [Transform]
            setExpandedCard(
                card.card_faces.map((card_face) => {
                    return createElement('img', {
                        id: 'reduce-card',
                        className: 'card-image b-radius-20',
                        src: card_face.image_uris.normal,
                        alt: `${card.name} image`,
                    })
                })
            )
        }
    }, [card]);


    return (
        <>
            <div className="card-content" onClick={(e) => handleClick(e, card, imgAttributes, ExpandedCard)} ref={ref}>
                <header className="card-header">
                    <h2 className="card-name">{card.name}</h2>
                </header>
                <section className="card-body" >
                    <CardImageSection attributes={imgAttributes} />
                    <CardDetailSection card={card} searchType={searchType} loading={loading} />
                </section>
                <footer className="card-footer">
                    {searchType === 'search-catalog' ? (
                        <CatalogCardFooter card={card} />
                    ) :
                        searchType === 'search-collection' ? (
                            <CollectionCardFooter card={card} />
                        ) : (
                                <ApiCardFooter card={card} setLoading={(value) => { setLoading(value) }} />
                        )
                    }
                </footer>
            </div>
        </>
    )
})

export default Card;
