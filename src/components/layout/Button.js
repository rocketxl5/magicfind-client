const Button = ({ attributes, handleClick }) => {
    const { id, style, type, value, status } = attributes;
    console.log(handleClick)
    return (
        <button id={id} className={style} type={type} onClick={handleClick} disabled={status}>{value}</button>
    )
}

export default Button
