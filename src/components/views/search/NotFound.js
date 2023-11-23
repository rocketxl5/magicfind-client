import React from 'react'

const NotFound = (props) => {
    const { cardName } = props;
    return (
        <div className="not-found">
            <header>

            </header>
            <h2>Ooops! No results were found for "{cardName}"</h2>
            <p>Check your spelling or search the autocomple list.</p>
        </div>
    )
}

export default NotFound
