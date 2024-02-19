const Header = ({ title, classList, children }) => {
    return (
        <header className={classList}>
            <h3>{title}</h3>
            {children}
        </header>
    )
}

export default Header
