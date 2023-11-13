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
    const values = payload.values
    const requirements = payload.requirements
    const handle = payload.name
    let updatedRequirements = []

    if (handle === 'password') {
      // Update confirm password state
      if (values.confirmPassword) {
        updatedRequirements = updateRequirements(requirements.confirmPassword, values.password, true)
        inputStates = { ...inputStates, confirmPassword: updatedRequirements }
      }
      // Update password state
      updatedRequirements = updateRequirements(requirements.password, values.password)
      inputStates = { ...inputStates, [handle]: updatedRequirements }
    }
    // Change in confirm password
    else if (handle === 'confirmPassword') {

      updatedRequirements = updateRequirements(requirements.input, values.input, true)
      inputStates = { ...inputStates, confirmPassword: updatedRequirements }
    }
    else {
      // Change in other inputs
      updatedRequirements = updateRequirements(requirements.input, values.input)
      inputStates = { ...inputStates, [handle]: updatedRequirements }
    }
  }

  function focusHandler(payload) {
    const isConfirmPassword = payload.name === 'confirmPassword' ? true : false
    const requirements = updateRequirements(payload.requirements, payload.value, isConfirmPassword)
    inputStates = { ...inputStates, [payload.name]: requirements }
  }

  function blurHandler(payload) {
  }

  function updateRequirements(requirements, value, isConfirmPassword = false) {
      return requirements.map((requirement) => {
        const pattern = !isConfirmPassword ? requirement.pattern : new RegExp(requirement.pattern)
        requirement = { ...requirement, fullfiled: pattern.test(value) ? true : false }
        return requirement
      })
  }
}

export default inputReducer;