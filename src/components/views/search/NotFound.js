import React from 'react'

const NotFound = (props) => {
    const { searchTerm } = props;
    return (
        <div>
            <h1>No result found form {searchTerm}</h1>
        </div>
    )
}

export default NotFound
