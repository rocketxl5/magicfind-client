
const Button = ({ attributes, handleClick, active }) => {
    const { id, type, style, value, status } = attributes;

    return (
        <button id={id} className={active === id ? 'active' : style} type={type} onClick={handleClick} disabled={status}>{value}</button>
    )
}

export default Button
