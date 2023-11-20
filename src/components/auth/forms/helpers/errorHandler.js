import capitalizeWord from '../../../../utilities/capitalizeWord'
// Sets and return error message object 
const errorHandler = (values, inputs) => {
    const handles = Object.keys(values)
    let errors = {}
    handles.forEach((handle) => {
        // Empty input: required input
        if (!values[handle]) {
            errors = { ...errors, [handle]: (handle === 'confirmPassword') ? `${capitalizeWord('password')} is required` : `${capitalizeWord(handle)} is required` }
            inputs[handle].blur()
        }
            // Requirements unfullfiled: invalid input 
        else if (inputs[handle].validity.patternMismatch) {
            errors = { ...errors, [handle]: (handle === 'confirmPassword') ? 'Password doesn\'t match' : `Invalid ${capitalizeWord(handle)}` }
            inputs[handle].blur()
        }
            // Invalid credentials
        else if (!inputs[handle].checkValidity()) {
            errors = { ...errors, [handle]: `Invalid ${capitalizeWord(handle)}` }
        }
    })
    return errors
}


export default errorHandler