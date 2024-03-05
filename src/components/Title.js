import React from 'react'

const Title = ({ classList = '', text }) => {

    return (
        <h2 className={classList}>
            {text}
        </h2>
    )
}

export default Title
