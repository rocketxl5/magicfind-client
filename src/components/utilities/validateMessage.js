const validateMessage = (values) => {
  let errors = {};

  // Check for recipient
  if (!values.recipient) {
    errors.recipient = 'Recipient is required';
  }

  // Check for email
  if (!values.subject) {
    errors.subject = 'Subject is Required';
  }

  // Check for message
  if (!values.text) {
    errors.text = 'Message is required';
  } else if (parseInt(values.text.length) > 500) {
    errors.text = 'Message is too long';
  }
  return errors;
};

export default validateMessage;
