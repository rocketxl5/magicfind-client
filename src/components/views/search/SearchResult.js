import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import SearchResultHeader from './SearchResultHeader';
import CatalogCard from './CatalogCard';
import SkryfallCard from './SkryfallCard';
import CollectionCard from './CollectionCard';

const SearchResult = () => {
    const location = useLocation();
    // 
    const { cardsFound, cardName, type } = location.state;
    const [cards, setCards] = useState(null);
    const [selectedCards, setSelectedCards] = useState([]);

    useEffect(() => {
        switch (type) {
            case 'search-catalog':
                setCards(cardsFound);
                break;
            case 'search-collection':
                setCards(cardsFound);
                break;
            default:
                setCards(getCardFinishes(cardsFound));
                break;
        }
    }, []);

    // Adds to cardsFound array foil or other versions of cards if any 
    const getCardFinishes = (cardsFound) => {

        const duplicate = (cardsFound, card, index) => {
            // Save finishes array from api card
            const finishes = card.finishes;
            finishes.forEach(finish => {
                // Replace card finishes array value with single finish  
                card.finishes = [finish];
                card.selected = false;
                // Add updated card to cardsFound array at index
                cardsFound.splice(index, 0, { ...card });
            })
        }
        cardsFound.forEach((card, index) => {
            if (card.finishes.length > 1) {
                cardsFound.splice(index, 1);
                duplicate(cardsFound, card, index);
            }
        });
        return cardsFound;
    }

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
            {cards &&
                <>
                    <SearchResultHeader cardName={cardName} cards={cards} />
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
            }
        </div>
    )
}

export default SearchResult;
