import React from 'react'

const Results = ({ items }) => {
    return (
        <span className="results">
            {
                items ?
                    `${items} ${items > 1 ? 'results' : 'result'}` :
                    'No results'
            }
        </span>
    )
}

export default Results
