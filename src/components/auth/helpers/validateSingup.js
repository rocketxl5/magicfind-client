import capitalizeWord from '../../utilities/capitalizeWord';
import inputValidationParams from './inputValidationParams';

const validateSignup = (values, refs, event) => {
    const validationParams = inputValidationParams(values)
// console.log(validationParams)
// console.log(values)
// console.log(refs)


    const keys = getKeys(refs);

    // console.log(event.type)

    dispatchInputHandler(refs, keys, event, validationParams)


    // const value = refs[keys].value;

    // if (validationParams[keys].pattern.test(value)) {
    //     refs[keys].classList.add('input-success')
    // }



    function getKeys(obj) { return Object.keys(obj) }
    function dispatchInputHandler(refs, keys, event, validationParams) {

        const inputCount = keys.length;
        const key = inputCount === 1 && keys[0];
        const params = inputCount === 1 && getValidationParams(key, validationParams);
        // console.log(validationParams)

        switch (event.type) {
            case 'change':
                handleInputChange(refs[key], params)
                break;
            case 'focus':
                handleInputFocus(refs[key], params)
                break;
            case 'blur':
                handleInputBlur(refs[key], params)
                break;
            // submit
            default:
                handleInputSubmit(refs, validationParams)
                break;
        }

        function getValidationParams(key, validationParams) {
            // console.log(key)
            // console.log(validationParams)
            return {
                pattern: validationParams[key].pattern,
                errorMessage: validationParams[key].errorMessage
            }
        }
        function handleInputChange(ref, params) {

        }
        function handleInputFocus(ref, params) {
            console.log(ref)
            console.log(params)
        }
        function handleInputBlur(ref, params) {
            console.log(ref)
            console.log(params)
        }
        function handleInputSubmit(refs, validationParams) {

        }
    }
}
export default validateSignup;