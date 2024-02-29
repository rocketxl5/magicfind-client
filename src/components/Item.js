import React from 'react'

const Item = ({ children, classList }) => {
    return (
        <li className={classList}>
            {children}
        </li>
    )
}

export default Item
