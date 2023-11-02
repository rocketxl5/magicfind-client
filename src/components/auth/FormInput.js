import React, { useEffect, useState } from 'react';
import inputValidation from './helpers/validateSingup';
import toggleClass from '../utilities/toggleClass'

const FormInput = (props) => {
    const { id, label, onChange, values, errors, setErrors, name, ...inputProps } = props;

    const [isValid, setIsValid] = useState(true);

    // key, value, params
    const handleBlur = (e) => {
        if (errors[e.target.name]) {
            toggleClass(e.target, 'input-error')
        }
        const inputError = inputValidation(values, e.target);


        setErrors({ ...errors, [e.target.name]: inputError[e.target.name] })

    }

    const handleFocus = (e) => {
        if (errors[e.target.name]) {
            if (/required/.test(errors[e.target.name]) || /match/.test(errors[e.target.name])) {

                const clone = { ...errors }
                delete clone[e.target.name];
                setErrors(clone)
            }

            // const pattern = 'required';
            toggleClass(e.target, 'input-error')

        }
    }

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
                onBlur={handleBlur}
                onFocus={handleFocus}
                isValid="true"
            />
            <span>{ }</span>
        </div>

    )
}

export default FormInput;
