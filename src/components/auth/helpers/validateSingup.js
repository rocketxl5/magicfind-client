import capitalizeWord from '../../utilities/capitalizeWord';
import inputValidationParams from './inputValidationParams';

const validateSignup = (values, target) => {
    let errors = {};


    const validateInputValue = (key, values) => {
        const params = inputValidationParams(key, values)

        // If input value does not meet criteria
        if (values[key] && !params.pattern.test(values[key].trim())) {
            errors[key] = params.error;
            // Assign password error
            if (key === 'confirmPassword') {
                errors['password'] = params.error;
            }
        }
    }


    // If target is form => validation called on form submit
    // Check for empty fields. If found populate errors object with 
    // with proper error message
    if (target.nodeName.toLowerCase() === 'form') {
        const keys = Object.keys(values);
        keys.forEach(key => {
            // If empty string
            if (!values[key]) {
                // Set error prop with error message
                errors[key] = `${capitalizeWord(key === 'confirmPassword' ? 'password' : key)} is required`
            }
            // Else value is set 
            else {
                // validate value
                validateInputValue(key, values)
            }
        })
        // validation called on input blur event
    } else {
        if (target.name === 'confirmPassword') {
            console.log('not ready')
        } else {

            validateInputValue(target.name, values)
        }
    }

    return errors;
};

export default validateSignup;