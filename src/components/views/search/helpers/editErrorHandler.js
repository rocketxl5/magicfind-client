import capitalizeWord from '../../../../utilities/capitalizeWord'
// Sets and return error message object 
const editErrorHandler = (values, inputs) => {
    const handles = Object.keys(values)
    let errors = {}
    console.log(handles)
    console.log(inputs)
    handles.forEach((handle) => {
        // Empty input: required input

        if (!values[handle]) {
            console.log(values[handle])
            errors = { ...errors, [handle]: `${capitalizeWord(handle)} is required` }
            // inputs[handle].blur()
        }
    })
    return errors
}


export default editErrorHandler;