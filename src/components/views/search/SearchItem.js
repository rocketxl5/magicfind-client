import { useState, forwardRef } from 'react';
import CardDetailSection from './CardDetailSection';
// Footers
import CatalogCardFooter from './CatalogCardFooter';
import CollectionCardFooter from './CollectionCardFooter';
import ApiCardFooter from './ApiCardFooter';

import Image from './CardImage';
import ExpandBtn from './cardbtn/ExpandBtn';
import useAttributes from '../../../hooks/useAttributes';


const SearchItem = forwardRef(function SearchItem(props, ref) {
    const { index, card, searchType, handleCardView, handleCardState } = props;
    const [loading, setLoading] = useState(false);
    const { attributes } = useAttributes(card);

    return (
            <div className="card-content" ref={ref}>
            <header className="card-header">
                    <h2 className="card-name">{card.name}</h2>
                </header>
            <div className="card-body" >
                <section className="card-section">
                    <Image card={card} handleCardView={handleCardView} />
                        <ExpandBtn />
                    </section>
                <section className="card-section">
                    <CardDetailSection index={index} card={card} searchType={searchType} loading={loading} />
                </section>
            </div>
                <footer className="card-footer" onClick={(e) => handleCardState(e, card, attributes)}>
                    {searchType === 'search-catalog' ? (
                    // <CatalogCardFooter card={card} />
                    ''
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
