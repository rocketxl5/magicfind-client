const Button = (props) => {
    const { children, id, style, type, classList, handleClick, title, disabled } = props;

    return (
        <button
            id={id ? id : ''}
            className={classList ? classList : ''}
            style={style ? style : {}}
            type={type ? type : 'button'}
            title={title}
            onClick={handleClick}
            disabled={disabled ? disabled : false}
        >
            {children}
        </button>
    )
}

export default Button
