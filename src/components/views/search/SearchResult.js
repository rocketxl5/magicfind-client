import React, { useState, useEffect, useReducer } from 'react';
import { useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom';
import SearchResultHeader from './SearchResultHeader';
import CatalogCard from './CatalogCard';
import SkryfallAPICard from './SkryfallAPICard';
import CollectionCard from './CollectionCard';
import handleSearchBar from '../../utilities/handleSearchBar';
import styled from 'styled-components';

const reducer = (state, action) => {
    switch (action) {
        case 'remove-card':
            action.target.classList.add('selected')
            break;
        case 'add-card':
            action.target.classList.remove('selected')
            break;

        default:
            break;
    }

}
const SearchResult = () => {
    const location = useLocation();
    const history = useHistory();
    const { cards, cardName, type } = location.state;
    const [selectedCards, setSelectedCards] = useState([]);
    const [state, dispatch] = useReducer(reducer, { selection: [] })


    const handleMouseDown = (e, index, card) => {
        console.log('target', e.target)
        // if (!selectedCards.lenght === 0) {
        //     setSelectedCards([card, ...selectedCards]);
        // }
        let type = '';
        const found = selectedCards.find(cardSelected => {
            return cardSelected.id === card.id
        })

        console.log('found card', card)

        if (found) {
            // type = 'remove-card';
            setSelectedCards(selectedCards.filter(cardSelected => {
                return cardSelected.id !== card.id;
            }))
        } else {
            // type = 'add-card';
            setSelectedCards([card, ...selectedCards]);
        }

        e.target.classList.toggle('selected');

        // dispatch({ type: type, target: e.target })
    }

    const handleClick = (e) => {

    }

    useEffect(() => {
        console.log(selectedCards)
    }, [selectedCards])

    return (
        <div className="section search-result">
            {(type === 'search-api' && selectedCards.length > 0) && <button className="select-btn" onClick={handleClick}> Add Cards To Collection</button>}
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
                                    <SkryfallAPICard
                                        key={index}
                                            index={index}
                                        card={card}
                                            handleMouseDown={handleMouseDown}
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
