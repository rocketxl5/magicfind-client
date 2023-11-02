const inputValidationParams = (key, values) => {
    const params = {
        username: {
            pattern: /^(?=.*[a-z])[a-z0-9]{3,12}$/,
            error: 'Username must be 3 to 12 characters. Lowercase letters and numbers only.'
        },
        email: {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            error: 'Invalid email. Plese provide a valid email address.'
        },
        country: {
            pattern: /^[a-zA-Z]+$/,
            error: 'Country must only be letters.'
        },
        password: {
            pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/,
            error: 'Password must be 6 to 12 characters long and contain at least 1 capital letter, 1 number and 1 special character (!@#$%^&*).'
        },
        confirmPassword: {
            pattern: new RegExp(values.password),
            error: 'Passwords don\'t match.'
        }
    }

    return params[key];
}

export default inputValidationParams;