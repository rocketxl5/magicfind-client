import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import capitalizeString from '../../utilities/capitalizeString';
import styled from 'styled-components';

const SearchResultHeader = ({ cardName, cards, clearSearch }) => {
    const history = useHistory();
    console.log(history);
    return (
        <header className="search-result-header">
            <div className="search-result-top">
                {true === 'add-card' ? (
                    <GoBack to={'/search-api'} title="Back To Search">
                        <BackIcon>
                            <FiArrowLeftCircle size={26} />
                        </BackIcon>
                        <BackText>Back to Search</BackText>
                    </GoBack>
                ) : (
                    <GoBack to={'/store'} title="Back To Store">
                        <BackIcon>
                            <FiArrowLeftCircle size={26} />
                        </BackIcon>
                        <BackText>Back to Store</BackText>
                    </GoBack>
                )}
            </div>
            <div className="search-result-bottom">
                <h3 className="card-title">
                    {capitalizeString(cardName)}
                </h3>
                <div className="card-quantity">
                    <span>
                        {`${cards.length} 
                 ` + (cards.length > 1 ? 'Results' : 'Result')}
                    </span>
                </div>
                {/* <span className="clear-search" onClick={clearSearch}>
                    <FiXCircle size={20} />
            </span> */}

            </div>
        </header>
    )
}

const GoBack = styled(Link)`
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;
const BackIcon = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BackText = styled.span`
  margin-left: 20px;
`;

export default SearchResultHeader;
