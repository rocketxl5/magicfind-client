import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import SearchResultHeader from './SearchResultHeader';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import CatalogCard from './CatalogCard';
import APICard from './APICard';
import CollectionCard from './CollectionCard';
import capitalizeString from '../../utilities/capitalizeString';


const SearchResult = () => {
    const location = useLocation();
    const { cards, cardName, type } = location.state;
    const [selectedCards, setSelectedCards] = useState([]);
    console.log(cards);
    // Handle for API card search //
    // Adds card to selectedCards array 
    // Toggles card-selected css class on parent container
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
        <div className="search-result">
            <header className="top-header">
                {type !== 'search-catalog' &&
                    <div className="back-link">
                        <Link to='/search-api'>{<FiChevronLeft />} Back to Search</Link>
                    </div>
                }
                <div className="search-result-info">
                    <h3>

                        {capitalizeString(cardName)}

                    </h3>
                    <span>
                        {`${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}`}
                    </span>
                </div>
            </header>
            {cards !== null && (
                <>
                    {
                        type === 'search-catalog' ? (
                            <div className="search-items">
                                {cards.map((card, index) => {
                                    return (
                                        <CatalogCard
                                            key={card.id}
                                            card={card}
                                        />)
                                })}
                            </div>
                        ) : type === 'search-collection' ? (
                            <div className="search-items">
                                {cards.map((card, index) => {
                                    return (
                                        <CollectionCard
                                            key={card.id}
                                            card={card}
                                        />)
                                })}
                                </div>
                            ) : (
                                    <>
                                        <SearchResultHeader cardName={cardName} cards={cards} selectedCards={selectedCards} type={type} />
                                        <div className="search-items">
                                            {cards.map((card, index) => {
                                                return (
                                                    <APICard
                                            key={card.id}
                                            index={index}
                                            card={card}
                                            handleClick={handleClick}
                                                    />)
                                            })}
                                        </div>
                                    </>
                                )
                    }
                </>
            )}  
        </div>
    )
}

export default SearchResult;
