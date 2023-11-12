import ACTIONS from './ACTIONS';

const inputReducer = (inputStates, action) => {

  switch (action.type) {
    case ACTIONS.INPUT_CHANGE:
      changeHandler(action.payload)
      break;
    case ACTIONS.INPUT_FOCUS:
      focusHandler(action.payload)
      break;
    case ACTIONS.INPUT_BLUR:
      blurHandler(action.payload)
      break;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }

  return inputStates

  function changeHandler(payload) {
    console.log(payload)
    const values = payload.values
    const handle = payload.name
    const value = payload.value
    let requirements = []

    if (handle === 'password') {
      console.log('password')
      console.log(payload.requirements.confirmPassword)

      // Update confirm password state if confirm password has value
      if (values.confirmPassword) {
        console.log('confirm password in password')
        // console.log(inputStates.confirmPassword.requirements)
        requirements = updateRequirements(payload.requirements.confirmPassword, values.confirmPassword, true)
        inputStates = { ...inputStates, confirmPassword: requirements }
      }
      // Update password state
      requirements = updateRequirements(payload.requirements.password, value)
      inputStates = { ...inputStates, [handle]: requirements }
    }
    // Change in confirm password
    else if (handle === 'confirmPassword') {
      console.log('confirm password')

      requirements = updateRequirements(payload.requirements, value, true)
      inputStates = { ...inputStates, confirmPassword: requirements }
    }
    else {
      console.log('other inputs')

      // Change in other inputs
      requirements = updateRequirements(payload.requirements, value)
      inputStates = { ...inputStates, [handle]: requirements }
    }
  }


  function focusHandler(payload) {
    const isConfirmPassword = payload.name === 'confirmPassword' ? true : false
    const requirements = updateRequirements(payload.requirements, payload.value, isConfirmPassword)
    inputStates = { ...inputStates, [payload.name]: requirements }
  }

  function blurHandler(payload) {

    if (!payload.value) {

    }
  }

  function updateRequirements(requirements, value, isConfirmPassword = false) {
    console.log(requirements)
      return requirements.map((requirement) => {
        const pattern = !isConfirmPassword ? requirement.pattern : new RegExp(requirement.pattern)
        console.log(pattern.test(value))
        requirement = { ...requirement, fullfiled: pattern.test(value) ? true : false }
        console.log(requirement)
        return requirement
      })

  }

}

export default inputReducer;