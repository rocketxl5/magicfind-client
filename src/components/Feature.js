const Feature = ({ children, classList, title }) => {
    return (
        <>
            <div className={classList ? `${classList} feature` : 'feature'}>
                <section className='feature-header'>
                    <h2 className='feature-title'>{title}</h2>
                </section>
                {children}
            </div>
        </>
    )
}

export default Feature
