const inputValidationParams = (values) => {
    const params = {
        username: {
            pattern: /^(?=.*[a-z])[a-z0-9]{3,12}$/,
            errorMessage: 'Username must be 3 to 12 characters. Lowercase letters and numbers only.'
        },
        email: {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            errorMessage: 'Invalid email. Plese provide a valid email address.'
        },
        country: {
            pattern: /^[a-zA-Z]+$/,
            errorMessage: ``
        },
        password: {
            pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
            errorMessage: 'Criteria should be:\n8 to 16 characters long\nIt should contain:\n1 capital letter\n1 number\n1 special character (!@#$%^&*).'
        },
        confirmPassword: {
            pattern: new RegExp(values.password),
            errorMessage: 'Passwords don\'t match.'
        }
    }

    return params;
}

export default inputValidationParams;
// change occurs in password input
if (handle === 'password') {

    // confirmPassword value is defined && password and confirmPassword are different
    if (payload.values['confirmPassword'] && !value) {
        requirements = updateRequirements(inputStates['confirmPassword'].requirements, value)
        inputStates['confirmPassword'] = { requirements: requirements }
    }
    if (payload.values['confirmPassword'] && value !== payload.values['confirmPassword']) {
        console.log('different')
        requirements = updateRequirements(inputStates['confirmPassword'].requirements, value)
        inputStates['confirmPassword'] = { requirements: requirements }
    }
    requirements = updateRequirements(payload.requirements, value)
    inputStates[handle] = { requirements: requirements }
}
// change occurs in confirmPassword input
else if (handle === 'confirmPassword') {
    requirements = updateRequirements(payload.requirements, value)
    inputStates['confirmPassword'] = { requirements: requirements }
    // if (value !== payload.values['password']) {
    //   requirements = updateRequirements(payload.requirements, value)
    //   inputStates['confirmPassword'] = { requirements: requirements }
    //   // console.log('different')
    // }
}
else {
    // Other inputs

}


/** Condition block updating confirmPassword fullfiled property. **/
// If current input is password and confirm password inputState is set
// if (handle === 'password' && inputStates['confirmPassword']) {
//   // If confirm password value is different than password value
//   if (payload.values['confirmPassword'] !==value) {
//     // Get updated requirements fullfiled status
//     requirements = updateRequirements(inputStates['confirmPassword'].requirements,value)
//     // Update confirmPassword inputState object
//     inputStates['confirmPassword'] = { requirements: requirements }
//   }
// }
// return inputStates