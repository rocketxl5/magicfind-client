import { capitalize } from '../../assets/utilities/capitalize';
// Sets and return error message object 
const authErrorHandler = (values, inputs) => {
    const handles = Object.keys(values);

    let errors = {};

    handles.forEach((handle) => {
        // Empty input: required input
        if (!values[handle]) {
            errors = {
                ...errors,
                [handle]:
                    (handle === 'confirmPassword') ?
                        `${capitalize('password')} is required` :
                        `${capitalize(handle)} is required`
            }
            // inputs[handle].blur()
        }
        // Requirements unfullfiled: invalid input 
        else if (inputs[handle].validity.patternMismatch) {
            errors = {
                ...errors,
                [handle]:
                    (handle === 'confirmPassword') ?
                        'Password doesn\'t match' :
                        `Invalid ${capitalize(handle)}`
            }
            inputs[handle].blur()
        }
        // Invalid credentials
        else if (!inputs[handle].checkValidity()) {
            errors = {
                ...errors,
                [handle]: `Invalid ${capitalize(handle)}`
            }
        }
    })
    return errors
}


export default authErrorHandler