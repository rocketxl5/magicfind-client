import React from 'react'

const BackSide = ({ children, classList }) => {
    return (
        <div className={`${classList}`}>
            {children}
        </div>
    )
}

export default BackSide
