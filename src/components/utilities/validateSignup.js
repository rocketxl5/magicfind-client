const validateSignup = (values) => {
  let errors = {};

  // Check for name
  if (!values.username) {
    errors.username = 'Username is required';
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
  if (!values.repeat_password) {
    errors.repeat_password = 'Password is Required';
  }

  // Check if passwords match
  if (values.password && values.repeat_password) {
    if (values.password !== values.repeat_password) {
      errors.matching_passwords = 'Passwords do not match';
    }
  }

  return errors;
};

export default validateSignup;
