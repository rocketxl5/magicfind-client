import capitalizeWord from '../../utilities/capitalizeWord';
import inputValidationParams from './inputValidationParams';

const validateSignup = (values, refs, event, errors, setErrors) => {
    const validationParams = inputValidationParams(values);

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
    // 
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
            const value = ref.value;
            const pattern = params.pattern;
            console.log(pattern)
            console.log(value)
            if (pattern.test(value)) {
                ref.setCustomValidity('');
                const clone = { ...errors }
                delete clone[ref.name]
                setErrors(clone)
            }
        }
        function handleInputFocus(ref, params) {
            const value = ref.value;
            const errorMessage = params.errorMessage;

            if (!value) {
                ref.setCustomValidity('invalid');
                setErrors({ ...errors, [ref.name]: errorMessage })
            }
        }
        function handleInputBlur(ref, params) {
            const value = ref.value;

            if (!value) {
                ref.setCustomValidity('');
                const clone = { ...errors }
                delete clone[ref.name]
                setErrors(clone)
            }

        }
        function handleInputSubmit(refs, validationParams) {

        }

        function addClassName(ref, className) {
            ref.classList.add(className);
        }
        function removeClassName(ref, className) {
            ref.classList.remove(className);
        }
    }
}
export default validateSignup;