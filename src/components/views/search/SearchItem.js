import { useState, forwardRef } from 'react';
import CardDetailSection from './CardDetailSection';
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';
import useMagnifyImage from '../../../hooks/useMagnifyImage';

import CardImage from './CardImage';
import ExpandBtn from './cardbtn/ExpandBtn';
import useAttributes from '../../../hooks/useAttributes';

const SearchItem = forwardRef(function SearchItem(props, ref) {
    const { card, searchType, handleCardView, handleCardState } = props;
    const [loading, setLoading] = useState(false);


    const { imgAttributes } = useAttributes(card);
    const { expandedImage } = useMagnifyImage(card)

    return (
        (expandedImage && imgAttributes) && 
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

    )
})

export default SearchItem;
