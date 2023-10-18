import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { SearchContext } from '../../../contexts/SearchContext';
import SearchResultHeader from './SearchResultHeader';
import Spinner from '../../layout/Spinner';
import CatalogItem from './CatalogItem';
import StoreItem from './StoreItem';
import SkryfallItem from './SkryfallItem';

const SearchResult = (props) => {
    const { searchType } = useContext(SearchContext);
    const location = useLocation();
    const { cards, cardName, loading } = location.state;
    console.log(location.state)
    // console.log(cards)
    // console.log(cardName)
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="section search-result">
                    {cards &&
                        <>
                            <SearchResultHeader cardName={cardName} cards={cards} />
                            <div className="search-items">

                                {cards.map((card, index) => {
                                    return (
                                        searchType === 'search-catalog' ? (

                                            <CatalogItem
                                                key={index}
                                                card={card}
                                            />
                                        ) :
                                            searchType === 'search-collection' ? (
                                                <StoreItem
                                                    key={index}
                                                    card={card}
                                                />
                                            ) : (
                                                    <SkryfallItem
                                                        key={index}
                                                        card={card}
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
        </>
    )
}

export default SearchResult;
