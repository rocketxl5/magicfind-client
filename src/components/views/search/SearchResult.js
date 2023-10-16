import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import SearchResultHeader from './SearchResultHeader';
import Spinner from '../../layout/Spinner';
import CatalogItem from './CatalogItem';
import StoreItem from './StoreItem';
import SkryfallItem from './SkryfallItem';

const SearchResult = (props) => {
    const location = useLocation();
    const { cards, cardName, formName, loading } = location.state;
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
                                        formName === 'search-catalog' ? (

                                            <CatalogItem
                                                key={index}
                                                card={card}
                                            />
                                        ) :
                                            formName === 'search-store' ? (
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
