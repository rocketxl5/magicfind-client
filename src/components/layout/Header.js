const Header = ({ title, classList }) => {
    return (
        <header className={classList}>
            <h3>{title}</h3>
        </header>
    )
}

export default Header
