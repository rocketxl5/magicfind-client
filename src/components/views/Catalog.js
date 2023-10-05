import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CatalogItem from './CatalogItem';


const Catalog = () => {
  const [isValid, setIsValid] = useState(false);
  const location = useLocation();
  const { search } = useParams();
  const result = location.state.result;

  useEffect(() => {
    setIsValid(true);
  }, [location]);

  const handleClick = () => {
    setIsValid(false);
  };
  return (
    <div>
      {isValid ? (
        <>
          <h2 className="page-title">Search Results</h2>
          <div className="search-header">
            <span>
              {`${search.charAt(0).toUpperCase()}${search
                .substring(1)
                .toLowerCase()} ${result.length} 
              ` + (result.length > 1 ? 'Results' : 'Result')}
            </span>
            <div className="clear-search" onClick={handleClick}></div>
          </div>

          <div className="catalog-items">
            {result.map((card, index) => {
              return <CatalogItem key={index} card={card} />;
            })}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Catalog;
