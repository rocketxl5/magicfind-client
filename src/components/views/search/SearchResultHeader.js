import React from 'react';
import { Link } from 'react-router-dom';
import capitalizeString from '../../utilities/capitalizeString';

const SearchResultHeader = (props) => {
    const { cardName, cards, selectedCards, type } = props;
    console.log(selectedCards)
    return (
        <header className="result-header">
            <div className="result-header-top">
                <Link to='/search-api'>Back to {capitalizeString(type)}</Link>
                {selectedCards.length > 0 &&
                    <span>Selected: {selectedCards.length}</span>
                }
            </div>
            <h3 className="result-header-bottom">
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
