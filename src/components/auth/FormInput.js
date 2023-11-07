import React, { forwardRef } from 'react';
import Requirements from './Requirements';

const FormInput = forwardRef((props, ref) => {
    const { id, name, inputState, onChange, onFocus, onBlur, label, ...inputProps } = props;
    const inputRef = ref;
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

                <Requirements inputState={inputState} />
            }
        </div>
    )
})

export default FormInput;
