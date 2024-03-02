import React from 'react'

const ListItem = ({ children, classList }) => {
    return (
        <li className={classList}>
            {children}
        </li>
    )
}

export default ListItem
