import capitalizeWord from '../../../../utilities/capitalizeWord'
// Sets and return error message object 
const editErrorHandler = (values) => {
    const handles = Object.keys(values)
    let errors = {}
    handles.forEach((handle) => {
        // Empty input: required input
        if (!values[handle]) {
            console.log(values[handle])
            errors = { ...errors, [handle]: `${capitalizeWord(handle)} is required` }
        }
    })
    return errors
}


export default editErrorHandler;