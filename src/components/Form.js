const Form = ({ children, id, classList = '', handleSubmit }) => {
    return (
        <form id={id} className={classList} onSubmit={handleSubmit} >
            {children}
        </form>
    )
}

export default Form
