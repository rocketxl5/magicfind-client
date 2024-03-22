import React from 'react'

const Alert = ({ children, classList }) => {
    return (
        <div className={`alert ${classList}`}>
            {children}
        </div>
    )
}

export default Alert
