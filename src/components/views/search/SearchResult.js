import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import SearchResultHeader from './SearchResultHeader';
import Spinner from '../../layout/Spinner';
import CatalogCard from './CatalogCard';
import SkryfallAPICard from './SkryfallAPICard';
import CollectionCard from './CollectionCard';

const SearchResult = () => {
    const location = useLocation();
    const { cards, cardName, type, loading } = location.state;
    console.log(location.state)
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
