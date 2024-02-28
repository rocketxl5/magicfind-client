import React from 'react'

const Title = ({ children, classList, text }) => {

    return (
        <h2 className={classList}>
            {text}
            {children}
        </h2>
    )
}

export default Title
