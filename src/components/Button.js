const Button = (props) => {
    const { children, id, type, classList = '', status = false, handleClick, title, style, active } = props;

    return (
        <button
            id={id ? id : ''}
            // className={active === id ? 'active' : classList}
            style={style}
            className={classList}
            type={type ? type : 'button'}
            title={title}
            onClick={handleClick}
            disabled={status}
        >
            {children}
        </button>
    )
}

export default Button
