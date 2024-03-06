const Span = ({ children, classList = '' }) => {
    return (
        <span className={classList}>
            {children}
        </span>
    )
}

export default Span
