import capitalizeWord from '../../utilities/capitalizeWord';

const validateSignup = (key, value, param, target) => {
    // console.log(target)
    // console.log(param)
    // If empty string and form submit
    if (!value && target.nodeName.toLowerCase() === 'form') {
        if (key === 'confirmPassword') {
            key = 'Confirm Passord'
        }
        return `${capitalizeWord(key)} is required`;
    }

    // If not empty and regex pattern is defined
    if (value && param.pattern) {
        // console.log(value)
        // console.log(param.pattern.test(value.trim()))

        // If value doesnt match regex constraint 
        if (!param.pattern.test(value.trim())) {
            // console.log(target.name)
            return param.error;
        }
    }

    return null;
};

export default validateSignup;

if (/required/.test(errors[e.target.name])) {
    const clone = { ...errors }
    delete clone[e.target.name];
    setErrors(clone)
    // console.log(errors[e.target.name])
} else {

}