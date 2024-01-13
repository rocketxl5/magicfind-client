import { useState, useEffect, createElement, forwardRef } from 'react';
import CardImageSection from './CardImageSection';
import CardDetailSection from './CardDetailSection';
import card_back from '../../../assets/img/card_back.jpg'
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';

import useMagnifyImage from '../../../hooks/useMagnifyImage';

import CardImage from './CardImage';
import ExpandBtn from './cardbtn/ExpandBtn';

const SearchItem = forwardRef(function SearchItem(props, ref) {
    const { card, searchType, handleCardView, handleCardState } = props;
    const [loading, setLoading] = useState(false);
    const image_uris = card?.image_uris || card?.card_faces[0].image_uris;
    const imgAttributes = {
        id: 'expand-card',
        style: 'card-image b-radius-10',
        src: image_uris.small,
        alt: `${card.name} image`,
        placeholder: card_back
    }

    const { expandedImage } = useMagnifyImage(card)

    return (
        <>
            <div className="card-content" ref={ref}>
                <header className="card-header">
                    <h2 className="card-name">{card.name}</h2>
                </header>
                <section className="card-body" >
                    <section className="card-section" onClick={(e) => handleCardView(e, card.layout, expandedImage)}>
                        <CardImage attributes={imgAttributes} />
                        <ExpandBtn />
                    </section>
                    <CardDetailSection card={card} searchType={searchType} loading={loading} />
                </section>
                <footer className="card-footer" onClick={(e) => handleCardState(e, card, imgAttributes)}>
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

export default SearchItem;
