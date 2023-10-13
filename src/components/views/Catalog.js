import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CatalogItem from './CatalogItem';
import Spinner from '../layout/Spinner';
import SearchResultHeader from './search/SearchResultHeader';


const Catalog = () => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(null);
  const [cardName, setCardName] = useState('');
  const location = useLocation();
  const { search } = useParams();

  // console.log(location.state);

  useEffect(() => {
    setCards(location.state.data);
    setLoading(location.state.loading)
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="search-header">
              <h2 className="page-title">Search Results</h2>
              <SearchResultHeader cardName={cardName} cards={cards} />
            </div>
            <div className="catalog-items">
              {cards &&
                cards.map((card, index) => {
                  return (<CatalogItem key={index} card={card} />)
                })
              }
            </div>
          </>
      )}
    </>
  );
};

export default Catalog;
