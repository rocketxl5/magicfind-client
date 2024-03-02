const Header = ({ children, classList }) => {
    return (
        <header className={classList}>
            {children}
        </header>
    )
}

export default Header
