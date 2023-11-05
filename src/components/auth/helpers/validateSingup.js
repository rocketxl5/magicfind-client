import capitalizeWord from '../../utilities/capitalizeWord';
import inputValidationParams from './inputValidationParams';

const validateSignup = (values, refs, event, errors, setErrors) => {
    const validationParams = inputValidationParams(values);
    const keys = getKeys(refs);

    dispatchInputHandler(refs, keys, event, validationParams)

    function getKeys(obj) { return Object.keys(obj) }
    function dispatchInputHandler(refs, keys, event, validationParams) {

        const inputCount = keys.length;
        const key = inputCount === 1 && keys[0];
        const params = inputCount === 1 && getValidationParams(key, validationParams);
        // console.log(validationParams)

        switch (event.type) {
            case 'change':
                handleInputChange(refs[key], params, setErrors, errors)
                break;
            case 'focus':
                handleInputFocus(refs[key], params, setErrors, errors)
                break;
            case 'blur':
                handleInputBlur(refs[key], params, setErrors, errors)
                break;
            // submit
            default:
                handleInputSubmit(refs, validationParams, setErrors, errors)
                break;
        }
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
        const value = ref.value;
        const pattern = params.pattern;
        console.log(pattern)
        if (pattern.test(value)) {
            // ref.setCustomValidity('');
            // setTimeout(() => {
            //     updateErrors(ref)
            // }, 500)
        }
    }
    function handleInputFocus(ref, params, errors) {
        const value = ref.value;
        console.log(ref)
        if (!value) {
            setErrors({ [ref.name]: true })
        }
    }
    function handleInputBlur(ref) {
        const value = ref.value;

        if (!value) {
            setErrors({ [ref.name]: false })
        }
    }
    function handleInputSubmit(refs, validationParams, setErrors, errors) {

    }
}
export default validateSignup;