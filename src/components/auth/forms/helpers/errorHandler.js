import capitalizeWord from '../../../utilities/capitalizeWord'
// Sets and return error message object 
const errorHandler = (values, inputs) => {
    const handles = Object.keys(values)
    let errors = {}
    handles.forEach((handle, index) => {
        // If empty input: required input
        if (!values[handle]) {
            console.log(handle)
            errors = { ...errors, [handle]: (handle === 'confirmPassword') ? `${capitalizeWord('password')} is required` : `${capitalizeWord(handle)} is required` }
            inputs[handle].blur()
        }
        // If requirements unfullfiled: invalid input 
        else if (inputs[handle].validity.patternMismatch) {
            console.log(handle)
            errors = { ...errors, [handle]: (handle === 'confirmPassword') ? 'Password doesn\'t match' : `Invalid ${capitalizeWord(handle)}` }
            inputs[handle].blur()
        }

    })
    return errors
}


export default errorHandler