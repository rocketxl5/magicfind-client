import React from 'react'

const Drop = ({ children, classList = '', handleClick }) => {

    return (
        <button className={`${classList} drop-btn`} onClick={handleClick}>
            {children}
        </button>
    )
}

export default Drop
