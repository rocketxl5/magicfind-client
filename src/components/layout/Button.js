const Button = (props) => {
    const { attributes, eventHandler } = props;
    const { style, type, value, status } = attributes;

    return (
        <button className={style} type={type} onClick={eventHandler} disabled={status}>{value}</button>
    )
}

export default Button
