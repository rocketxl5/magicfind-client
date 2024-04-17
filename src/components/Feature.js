import React from 'react'

const Feature = ({ children, classList, title }) => {
    return (
        <>
            <div className={'feature-section'}>
                <section className='feature-header'>
                    <h2 className='feature-title'>{title}</h2>
                </section>
                <section className={classList ? `${classList} feature-section` : ''}>
                    {children}
                </section>
            </div>
        </>
    )
}

export default Feature
