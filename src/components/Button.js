
const Button = (props) => {
    const { children, id, type, classList, status, handleClick, active } = props;

    return (
        <button
            id={id ? id : ''}
            className={active === id ? 'active' : classList}
            type={type ? type : 'button'}
            onClick={handleClick}
            disabled={status}
        >
            {children}
        </button>
    )
}

export default Button
