const validateSignup = (values) => {
  let errors = {};

  // Check for name
  if (!values.username.trim()) {
    errors.username = 'Username is required';
  }

  // Check for email
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  }

  // Check for country
  if (!values.country.trim()) {
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
      errors.matching_passwords = true;
    }
  }

  return errors;
};

export default validateSignup;
