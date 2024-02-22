import React, { forwardRef } from 'react';
import Requirements from './Requirements';

const FormInput = forwardRef((props, ref) => {
    const { id, name, inputState, onChange, onFocus, errors, onBlur, label, ...inputProps } = props;
    const inputRef = ref;
    return (
        <div className="form-element">
            {
                !errors[name] ? (
                    <label htmlFor={id} >{label}</label>
                ) : (
                    <label className="color-danger" htmlFor={id} >{errors[name]}</label>
                )
            }
            <input
                className={errors[name] && 'border-danger danger-padding'}
                id={id}
                name={name}
                {...inputProps}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={inputRef}
            />
            {
                <Requirements inputState={inputState} />
            }
        </div>
    )
})

export default FormInput;
