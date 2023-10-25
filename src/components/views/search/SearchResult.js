import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import SearchResultHeader from './SearchResultHeader';
import CatalogCard from './CatalogCard';
import SkryfallCard from './SkryfallCard';
import CollectionCard from './CollectionCard';

const SearchResult = () => {
    const location = useLocation();
    // 
    const { cards, cardName, type } = location.state;
    const [selectedCards, setSelectedCards] = useState([]);
    console.log(type)
    const handleClick = (e, card, index) => {
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

        card.selected = !card.selected;
        document.querySelector(`#card-${index}`).classList.toggle('card-selected');
    }

    return (
        <div className="section search-result">
            {cards !== null ? (
                <>
                    <SearchResultHeader cardName={cardName} cards={cards} selectedCards={selectedCards} type={type} />
                    <div className="search-items">
                        {cards.map((card, index) => {
                        return (
                            type === 'search-catalog' ? (
                                <CatalogCard
                                    key={card.id}
                                    card={card}
                                />
                            ) :
                                type === 'search-collection' ? (
                                    <CollectionCard
                                        key={card.id}
                                        card={card}
                                    />
                                ) : (

                                        <SkryfallCard
                                            key={index}
                                            index={index}
                                            card={card}
                                            handleClick={handleClick}
                                        />


                                )
                        )
                    })}
                    </div>
                </>
            ) : (
                ''
            )

            }
        </div>
    )
}

export default SearchResult;
