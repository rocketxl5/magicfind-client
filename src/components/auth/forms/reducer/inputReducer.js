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
      console.log('No action provided')
      break;
  }

  return inputStates

  function changeHandler(payload) {

    const handle = payload.input.name
    const value = payload.input.value
    let requirements = []

    // change occurs in password input
    if (handle === 'password') {

      // confirmPassword value is defined && password and confirmPassword are different
      if (payload.values.confirmPassword && payload.values.confirmPassword !== value) {

        requirements = updateRequirements(inputStates['confirmPassword'].requirements, value, true)
        inputStates['confirmPassword'] = { requirements: requirements }
      }
      requirements = updateRequirements(payload.requirements, value)
      return inputStates[handle] = { requirements: requirements }
    }
    if (handle === 'confirmPassword') {

      requirements = updateRequirements(payload.requirements, value, true)
      return inputStates['confirmPassword'] = { requirements: requirements }

    }
    requirements = updateRequirements(payload.requirements, value)
    inputStates[handle] = { requirements: requirements }
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

  function updateRequirements(requirements, value, flag = false) {
    let update = ``
    let pattern = /``/
    if (flag) {
      update = `^${requirements[0].pattern}$`
      pattern = new RegExp(`${update}`)
      requirements[0].fullfiled = pattern.test(value)
      return requirements
    }
    else {
      return requirements.map((requirement) => {
        pattern = requirement.pattern
        // console.log(pattern)
        requirement.fullfiled = pattern.test(value) ? true : false;
        return requirement
      })
    }
  }

}

export default inputReducer;