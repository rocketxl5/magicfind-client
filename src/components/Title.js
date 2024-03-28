import React from 'react'

const Title = ({ children, classList = '' }) => {

    return (
        <h2 className={classList}>
            {children}
        </h2>
    )
}

export default Title
