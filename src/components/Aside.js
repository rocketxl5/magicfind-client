const Aside = ({ children, classList = '' }) => {
    return (
        <aside className={`aside ${classList}`}>
            {children}
        </aside>
    )
}

export default Aside
