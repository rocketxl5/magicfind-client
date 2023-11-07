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
    const handle = parseInt(payload.input.id)
    const requirementState = handleRequirements(payload.requirements, payload.input.value)
    const requirementsFullfiled = getFullfiledCount(requirementState)
    inputStates[handle] = { requirements: requirementState }

    if (requirementsFullfiled === payload.requirements.length) {

      inputStates[handle] = { requirements: requirementState }
    }
    else {
      inputStates[handle] = { requirements: requirementState }
    }
  }

  function focusHandler(payload) {
    const handle = parseInt(payload.input.id)

    if (!payload.input.value) {
      inputStates[handle] = { requirements: payload.requirements }
    }
  }

  function blurHandler(payload) {
    const handle = parseInt(payload.input.id)

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

  function getFullfiledCount(requirements) {
    const fullfiled = requirements.filter(requirement => {
      return requirement.fullfiled
    })

    return fullfiled.length
  }

  return inputStates;
}

export default inputReducer;