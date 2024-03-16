import React from 'react'

const Section = ({ children, id, classList }) => {
    return (
        <section id={id} className={classList}>
            {children}
        </section>
    )
}

export default Section
