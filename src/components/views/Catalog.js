import React, { useContext, Fragment, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CatalogItem from './CatalogItem';
import Spinner from '../layout/Spinner.js';
import { FiXCircle } from 'react-icons/fi';

import styled from 'styled-components';

const Catalog = () => {
  const [isOn, setIsOn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSelectedItem, setIsSelectedItem] = useState(false);
  const location = useLocation();
  const { search } = useParams();
  const result = location.state.result;

  useEffect(() => {
    setIsOn(true);
  }, [location]);

  const clearSearch = () => {
    setIsOn(false);
  };
  return (
    <div>
      {isOn ? (
        <Fragment>
          <h2 className="page-title">Search Results</h2>
          <div className="search-header">
            <span>
              {`${search.charAt(0).toUpperCase()}${search
                .substring(1)
                .toLowerCase()} ${result.length} 
              ` + (result.length > 1 ? 'Results' : 'Result')}
            </span>
            <div className="clear-search" onClick={() => clearSearch()}></div>
          </div>

          <div className="catalog-items">
            {result.map((card, index) => {
              return <CatalogItem key={index} card={card} />;
            })}
          </div>
        </Fragment>
      ) : (
        ''
      )}
    </div>
  );
};

export default Catalog;
