import React from 'react';
import capitalizeString from '../../utilities/capitalizeString';

const SearchResultHeader = ({ cardName, cards }) => {

    return (
        <header className="result-header">
            <h3 className="result-title">
                    <span>
                        {capitalizeString(cardName)}
                    </span>
                    <span>
                    {`${cards.length} ${cards.length > 1 ? 'Results' : 'Result'}`}
                </span>
            </h3>
        </header>
    )
}

export default SearchResultHeader;
