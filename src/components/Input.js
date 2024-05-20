import React from 'react'

const Input = (props) => {
    const {
        id,
        classList,
        type,
        name,
        value,
        handleChange,
        handleFocus,
        range,
        placeholder,
    } = props;



    const inputs = {
        text: () => {
            return (
                <input
                    id={id}
                    className={classList}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                />
            )
        },
        number: () => {
            return (
                <input
                    id={id}
                    className={classList}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    min={range.min}
                    max={range.max}
                    placeholder={placeholder}
                />
            )
        }
    }

    return (inputs[type]());
}

export default Input
