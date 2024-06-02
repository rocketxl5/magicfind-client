import { capitalize } from '../../../assets/utilities/capitalize';

// Sets and return error message object 
const editErrorHandler = (values) => {
    const handles = Object.keys(values);
    let errors = {}
    handles.forEach((handle) => {
        // Empty input: required input
        if (!values[handle]) {
            errors = { ...errors, [handle]: `${capitalize(handle)} is required` }
        }
    })
    return Object.keys(errors).length === 0 ? null : errors;
}


export default editErrorHandler;