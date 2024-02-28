const Header = ({ children, classList }) => {
    console.log(classList)
    return (
        <header className={classList}>
            {children}
        </header>
    )
}

export default Header
