import React from 'react'

const Span = ({ children, classList = '' }) => {
    return (
        <span className={classList}>
            {children}
        </span>
    )
}

export default Span
