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

    console.log(cards)
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
                                {cards && cards.map((card, index) => {
                                    return (
                                        formName === 'catalog' ? (
                                            <CatalogItem
                                                key={index}
                                                card={card}
                                            />
                                        ) : (
                                            ''
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
