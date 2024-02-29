import React from 'react'

const List = ({ children, classList }) => {
    return (
        <ul className={classList}>
            {children}
        </ul>
    )
}

export default List
