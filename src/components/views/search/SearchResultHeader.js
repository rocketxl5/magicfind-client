import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiChevronLeft } from 'react-icons/fi';
import capitalizeString from '../../utilities/capitalizeString';

const SearchResultHeader = (props) => {
    const { cardName, cards, selectedCards } = props;
    console.log(selectedCards)
    const handleClick = (e) => {

    }
    return (
        <header className="result-header">

            <div className="save-to-collection">
                {/* <Link to='/search-api'>{<FiChevronLeft />} Back to {capitalizeString(type)}</Link> */}
                {
                    <>
                        <span className="selected-count"> {selectedCards.length > 0 ? ` Cards Selected: ${selectedCards.length}` : 'Select a Card'}</span>
                        <button id="cart-card" className={`result-header-btn bg-yellow ${selectedCards.length === 0 && 'hide'}`} type="button" onClick={handleClick}>Save to Collection</button>
                    </>
                }
            </div>
        </header>
    )
}

export default SearchResultHeader;
