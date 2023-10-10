import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import capitalizeString from '../../utilities/capitalizeString';

const SearchResultHeader = ({ cardName, cards, clearSearch }) => {
    return (
        <header className="result-header">
            <h3 className="result-title">
                <div className="result-details">
                    <span>
                        {capitalizeString(cardName)}
                    </span>
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
