import capitalizeWord from '../../../utilities/capitalizeWord'
// Sets and return error message object 
const errorHandler = (values, inputs) => {
    const handles = Object.keys(values)
    let errors = {}
    console.log(inputs)
    handles.forEach(handle => {
        // If empty input: required input
        if (!values[handle]) {
            errors = { ...errors, [handle]: (handle === 'confirmPassword') ? `${capitalizeWord('password')} is required` : `${capitalizeWord(handle)} is required` }
        }
        // If requirements unfullfiled: invalid input 
        else if (inputs[handle].validity.patternMismatch) {
            errors = { ...errors, [handle]: (handle === 'confirmPassword') ? 'Password doesn\'t match' : `Invalid ${capitalizeWord(handle)}` }
        }

    })
    return errors
}


export default errorHandler