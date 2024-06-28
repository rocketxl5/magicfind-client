const Label = ({ children, htmlFor, label }) => {
    return (
        <label htmlFor={htmlFor}>
            {label}
            {children}
        </label>
    )
}

export default Label
