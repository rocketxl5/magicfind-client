const Drop = ({ children, id, classList = '', handleClick, disabled = false }) => {

    return (
        <button
            id={id}
            className={`${classList}`}
            type='button'
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default Drop
