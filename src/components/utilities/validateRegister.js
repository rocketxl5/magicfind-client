const validateRegister = (values) => {
  let errors = {};

  // Check for name
  if (!values.name) {
    errors.name = 'Name is required';
  }

  // Check for email
  if (!values.email) {
    errors.email = 'Email is required';
  }

  // Check for country
  if (!values.country) {
    errors.country = 'Country is Required';
  }

  // Check for password
  if (!values.password) {
    errors.password = 'Password is Required';
  }

  // Check for password
  if (!values.password2) {
    errors.password2 = 'Password is Required';
  }

  // Check if passwords match
  if (values.password && values.password2) {
    if (values.password !== values.password2) {
      errors.password = "Passwords don't match";
      errors.password2 = "Passwords don't match";
    }
  }

  return errors;
};

export default validateRegister;
