import { useState, useEffect } from 'react';

const useForm = (callback, validate, recipient, subject) => {
  const [values, setValues] = useState({
    recipient: recipient,
    subject: subject,
    text: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return { handleChange, values, handleClick, errors };
};

export default useForm;
