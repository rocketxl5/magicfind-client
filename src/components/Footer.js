const Footer = ({ children, classList = '' }) => {
    return (
        <footer className={classList}>
            {children}
        </footer>
    )
}

export default Footer
