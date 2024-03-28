import React from 'react'

const Drop = ({ children, classList = '', handleClick }) => {

    return (
        <button
            className={`${classList} absolute flex align-center justify-center color-light border-light b-radius-50 drop-btn`}
            onClick={(e) => handleClick ? handleClick() : console.log(e.target)}
        >
            {children}
        </button>
    )
}

export default Drop
