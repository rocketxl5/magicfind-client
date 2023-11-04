import React, { useState, useEffect, forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

const FormInput = forwardRef((props, ref) => {
    const { id, name, onChange, onFocus, onBlur, message, errors, label, ...inputProps } = props;
    const inputRef = ref;

    useEffect(() => {
        if (errors[name]) {
            inputRef.current.setCustomValidity(errors[name])
        } else {
            inputRef.current.setCustomValidity('')
        }
    }, [errors[name]])

    return (
        <div className="form-element">

            <label htmlFor={id} >{label}</label>
            <input
                id={id}
                name={name}
                {...inputProps}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={inputRef}
            />
            {
                <ErrorMessage message={message} />
            }
        </div>
    )
})

export default FormInput;
