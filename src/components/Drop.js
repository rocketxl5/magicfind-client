import React from 'react'

const Drop = ({ children, id, classList = '', handleClick }) => {

    return (
        <button
            id={id}
            className={`${classList} b-radius-5 drop-btn`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Drop
