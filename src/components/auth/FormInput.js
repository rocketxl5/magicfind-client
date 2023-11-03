import React, { useEffect, useState, forwardRef } from 'react';
import inputValidation from './helpers/validateSingup';
import toggleClass from '../utilities/toggleClass'

const FormInput = forwardRef((props, ref) => {
    const { id, label, onChange, onFocus, onBlur, errors, name, ...inputProps } = props;
    const inputref = ref;

    return (
        <div className="form-element">
            {
                !errors[name] ? (
                    <label htmlFor={id} >{label}</label>
                ) : (
                    <label htmlFor={id} className='empty-field'>{errors[name]}</label>
                )
            }
            <input
                id={id}
                className={errors[name] && 'input-error'}
                name={name}
                {...inputProps}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={inputref}
            />
            <span>{ }</span>
        </div>

    )
})

export default FormInput;
