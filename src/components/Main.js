import React from 'react'

const Main = ({ children, classList }) => {
    return (
        <main className={classList}>
            {children}
        </main>
    )
}

export default Main
