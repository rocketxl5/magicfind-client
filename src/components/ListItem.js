const ListItem = ({ children, classList = '' }) => {
    return (
        <li className={`list-item ${classList}`}>
            {children}
        </li>
    )
}

export default ListItem
