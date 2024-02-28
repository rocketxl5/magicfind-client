
const Button = (props) => {
    const { id, type, classList, text, status, handleClick, active } = props;

    return (
        <button id={id} className={active === id ? 'active' : classList} type={type} onClick={handleClick} disabled={status}>{text}</button>
    )
}

export default Button
