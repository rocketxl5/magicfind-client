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
    // submit
    case ACTIONS.INPUT_SUBMIT:
      console.log('action.type', action.type)
      console.log('action.payload', action.payload)
      break;
    default:
      console.log('No action provided')
      break;
  }

  function changeHandler(payload) {
    const handle = payload.input.name

    let requirementState = handleRequirements(payload.requirements, payload.input.value)
    inputStates[handle] = { requirements: requirementState }

    /**
     * 
     * Condition block updating confirmPasswords requirement fullfiled status before sumbitting form.
     * 
     * */
    // If current input is password and confirm password inputState is set
    if (handle === 'password' && inputStates['confirmPassword']) {
      // If confirm password value is different than password value
      if (payload.values['confirmPassword'] !== payload.input.value) {
        // Get updated requirements fullfiled status
        requirementState = handleRequirements(inputStates['confirmPassword'].requirements, payload.input.value)
        // Update confirmPassword inputState object
        inputStates['confirmPassword'] = { requirements: requirementState }
      }
    }
  }

  function focusHandler(payload) {
    const handle = payload.input.name

    if (!payload.input.value) {
      inputStates[handle] = { requirements: payload.requirements }

    }
  }

  function blurHandler(payload) {

    if (!payload.input.value) {

    }
  }

  function submitHandler(payload) {

  }

  function handleRequirements(requirements, value) {
    return requirements.map((requirement) => {
      requirement.fullfiled = requirement.pattern.test(value) ? true : false;
      return requirement
    })
  }

  return inputStates;
}

export default inputReducer;