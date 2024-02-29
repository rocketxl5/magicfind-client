import React from 'react'

const Aside = ({ children, classList }) => {
    return (
        <aside className={classList}>
            {children}
        </aside>
    )
}

export default Aside
