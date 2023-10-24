import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import SearchResultHeader from './SearchResultHeader';
import CatalogCard from './CatalogCard';
import SkryfallAPICard from './SkryfallAPICard';
import CollectionCard from './CollectionCard';

const SearchResult = () => {
    const location = useLocation();
    const { cards, cardName, type } = location.state;
    const [selectedCards, setSelectedCards] = useState([]);

    const handleMouseDown = (e, card) => {
        const found = selectedCards.find(cardSelected => {
            return cardSelected.id === card.id
        })

        if (found) {
            setSelectedCards(selectedCards.filter(cardSelected => {
                return cardSelected.id !== card.id;
            }))
        }
        else {
            setSelectedCards([card, ...selectedCards]);
        }
        e.target.classList.toggle('selected-card');
    }

    const handleClick = (e) => {

    }

    return (
        <div className="section search-result">
            {selectedCards.length > 0 && <button className="select-btn" type="button" onClick={handleClick}> Add Cards To Collection</button>}
            {cards &&
                <>
                    <SearchResultHeader cardName={cardName} cards={cards} />
                    <div className="search-items">

                    {cards.map((card, index) => {
                        return (
                            type === 'search-catalog' ? (

                                <CatalogCard
                                    key={index}
                                    card={card}
                                />
                            ) :
                                type === 'search-collection' ? (
                                    <CollectionCard
                                        key={index}
                                        card={card}
                                    />
                                ) : (
                                        <>

                                            <SkryfallAPICard
                                                key={index}
                                                index={index}
                                                card={card}
                                                handleMouseDown={handleMouseDown}
                                            />
                                        </>

                                )
                        )
                    })}
                    </div>
                </>
            }
        </div>
    )
}

export default SearchResult;
