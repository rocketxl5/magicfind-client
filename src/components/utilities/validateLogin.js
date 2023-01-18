const validateLogin = (values) => {
  let errors = {};

  // Check for email
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  }

  // Check for password
  if (!values.password) {
    errors.password = 'Password is Required';
  }

  return errors;
};

export default validateLogin;
