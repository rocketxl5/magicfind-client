import React from 'react'

const CardNotFound = (props) => {
    const { cardName } = props;
    return (
        <div className="not-found">
            <header>

            </header>
            <h2>Ooops! No results were found for "{cardName}"</h2>
            <p>Check your spelling or search the autocomplete list.</p>
        </div>
    )
}

export default CardNotFound
