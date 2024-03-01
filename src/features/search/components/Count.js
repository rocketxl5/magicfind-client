import React from 'react'

const Count = ({ count, type }) => {
    return (
        <span className="count">
            {
                count ?
                    `${count} ${count > 1 ? `${type}s` : type}` :
                    'No results'
            }
        </span>
    )
}

export default Count
