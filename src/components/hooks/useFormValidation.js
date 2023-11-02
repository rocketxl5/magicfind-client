import { useState, useEffect } from 'react'

// Optional setErrorMessage callback function for Singup form validation
// Sets error message if passwords dont match
const useForm = (callback, inputValidation, setErrorMessage) => {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const handleFocus = (e) => {
        if (e.target.classList.contains('input-error')) {
            e.target.classList.remove('input-error')

        }
    }

    const handleBlur = (e) => {
        let { name, value } = e.target

        // !value && setErrors({ ...errors, name: value })
        // Trim values if its not password related
        // value = (e.target.type !== 'password' && value) ? value.trim() : value;



        setValues({
            ...values,
            [name]: value
        })

        if (!value && isSubmit) {
            name = (name === 'repeatPassword') ? 'password' : name;
            // if (!value && isSubmit) {
            e.target.classList.add('input-error');
            e.target.placeholder = `${name.charAt(0, 1).toUpperCase()}${name.substring(1)} is required`;
        }
        // Check if username and/or email already exists in database
        // if (name === 'username' && value || name === 'email' && value) {

        //     const input = name === 'username' ? { username: value } : { email: value }
        //     console.log(name)

        //     const options = {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(input),
        //     }

        //     try {
        //         fetch(`${baseURL()}/api/users/${name}`, options)
        //             .then((res) => res.json())
        //             .then((data) => console.log(data))
        //             .catch(error => {
        //                 console.log(error)
        //             })
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setValues({
    //         ...values,
    //         [name]: value
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        // Remove focus on input if any
        // @ Enter key
        if (document.activeElement) {
            document.activeElement.blur();
        }

        setErrors(inputValidation(values));
        setIsSubmit(true);
    }

    useEffect(() => {
        // Error check for Singup form
        // errors.matchingPasswords && setErrorMessage(errors.matchingPasswords);
        console.log(errors)
        errors.matchingPasswords && setErrorMessage('Passwords do not match');
        if (Object.keys(errors).length === 0 && isSubmit) {
            callback(values);
        }
    }, [errors])

    return { handleFocus, handleBlur, handleSubmit, setIsSubmit, values, errors }
}

export default useForm;
