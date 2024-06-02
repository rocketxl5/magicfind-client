const Card = ({ children, classList, header, footer }) => {
    return (
        <div className={`card ${classList}`}>
            <header className='col-12'>
                {header}
            </header>
            {children}
            <footer className='col-12 relative flex column justify-center align-center gap-1'>
                {
                    footer.map(element => <div>{element}</div>)
                }
            </footer>
        </div>
    )
}

export default Card
