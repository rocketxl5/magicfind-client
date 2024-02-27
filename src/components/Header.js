const Header = ({ classList, children }) => {

    return (
        <header className={classList}>
            {children}
        </header>
    )
}

export default Header
