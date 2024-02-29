import React from 'react'

const Footer = ({ children, classList }) => {
    return (
        <footer className={classList}>
            {children}
        </footer>
    )
}

export default Footer
