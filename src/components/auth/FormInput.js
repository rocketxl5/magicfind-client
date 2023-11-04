import React, { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

const FormInput = forwardRef((props, ref) => {
    const { id, name, onChange, onFocus, onBlur, message, errors, label, ...inputProps } = props;
    const inputref = ref;
    // console.log(errors[name])
    // console.log(ref)
    // console.log(name)
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
                ref={inputref}
            />
            <ErrorMessage message={message} error={errors[name]} />
        </div>
    )
})

export default FormInput;
