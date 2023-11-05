import React, { useEffect, forwardRef } from 'react';
import Requirements from './Requirements';

const FormInput = forwardRef((props, ref) => {
    const { id, name, value, onChange, onFocus, onBlur, requirements, errors, label, ...inputProps } = props;
    const inputRef = ref;

    useEffect(() => {
        console.log(errors)
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
                <Requirements requirements={requirements} value={value} input={inputRef} />
            }
        </div>
    )
})

export default FormInput;
