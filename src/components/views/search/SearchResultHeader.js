import React from 'react';
<<<<<<< Updated upstream
import { FiXCircle } from 'react-icons/fi';
=======
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
>>>>>>> Stashed changes
import capitalizeString from '../../utilities/capitalizeString';

const SearchResultHeader = ({ cardName, cards, clearSearch }) => {
<<<<<<< Updated upstream
    return (
        <header className="result-header">
            <h3 className="result-title">
                <div className="result-details">
                    <span>
                        {capitalizeString(cardName)}
                    </span>
=======
    const history = useHistory();
    console.log(history);
    const location = useLocation();

    return (
        <header className="search-result-header">
            <div className="search-result-top">
                <GoBack to={location.pathname} title="Back To Search">
                    <BackIcon>
                        <FiArrowLeftCircle size={26} />
                    </BackIcon>
                    <BackText>Back to {location.pathname.replace(/\//, '')}</BackText>
                </GoBack>
            </div>
            <div className="search-result-bottom">
                <h3 className="card-title">
                    {capitalizeString(cardName)}
                </h3>
                <div className="card-quantity">
>>>>>>> Stashed changes
                    <span>
                        {`${cards.length} 
                 ` + (cards.length > 1 ? 'Results' : 'Result')}
                    </span>
                </div>
                <span className="clear-search" onClick={clearSearch}>
                    <FiXCircle size={20} />
                </span>
            </h3>
        </header>
    )
}

export default SearchResultHeader;
