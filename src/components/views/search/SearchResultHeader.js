import React from 'react';
import capitalizeString from '../../utilities/capitalizeString';

const SearchResultHeader = ({ cardName, cards }) => {
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

            </h3>
        </header>
    )
}

export default SearchResultHeader;
