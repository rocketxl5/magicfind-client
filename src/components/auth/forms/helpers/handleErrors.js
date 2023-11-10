import capitalizeWord from '../../../utilities/capitalizeWord'
const handleErrors = (values, inputs) => {
    const handles = Object.keys(values)
    let errors = {}

    handles.forEach(handle => {
        // If empty input
        if (!values[handle]) {
            // handle = (handle === 'confirmPassword') ? 'password' : handle
            errors = { ...errors, [handle]: `${capitalizeWord(handle === 'confirmPassword' ? 'password' : handle)} is required` }
        }
        // If value doesn't meet requirements
        else if (inputs[handle].validity.patternMismatch) {
            errors = { ...errors, [handle]: (handle === 'confirmPassword') ? 'Password doesn\'t match' : 'Invalid Password' }
        }

    })
    return errors
}


export default handleErrors