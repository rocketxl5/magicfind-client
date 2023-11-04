import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import FormInput from './FormInput';


import Spinner from '../layout/Spinner';
import inputValidation from './helpers/validateSingup';
// import useFormValidation from '../hooks/useFormValidation';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import validateLogin from './helpers/validateLogin';

const Signup = () => {

  const [values, setValues] = useState({
    username: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const countryRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const refs = {
    username: usernameRef.current,
    email: emailRef.current,
    country: countryRef.current,
    password: passwordRef.current,
    confirmPassword: confirmPasswordRef.current
  }

  const inputs = [
    { id: 1, name: 'username', type: 'text', value: values.username, placeholder: 'Username', label: 'Username', ref: usernameRef },
    { id: 2, name: 'email', type: 'text', value: values.email, placeholder: 'Email', label: 'Email', ref: emailRef, message: 'Invalid email. Plese provide a valid email address.' },
    { id: 3, name: 'country', type: 'text', value: values.country, placeholder: 'Country', label: 'Country', ref: countryRef },
    { id: 4, name: 'password', type: 'password', value: values.password, placeholder: 'Password', label: 'Password', ref: passwordRef, message: 'Password should be:\n8 to 16 characters long\nIt should contain:\n1 capital letter\n1 number\n1 special character (!@#$%^&*).' },
    { id: 5, name: 'confirmPassword', type: 'password', value: values.confirmPassword, placeholder: 'Confirm Password', label: 'Confirm Password', ref: confirmPasswordRef },
  ];
  const { setPathname } = useContext(PathContext);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (isValid) {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values)
      }

      try {
        fetch(`${api.serverURL}/api/users/signup`, options)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }

            return res.json().then((data) => {
              throw new Error(data)
            })
          })
          .then(data => {
            console.log(data);
            history.push({ pathname: '/login', state: { message: data.message } });
          })
          .catch(error => {
            setLoading(false);
            setErrorMessage(error.message)
            setIsValid(false)
          })
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
      }
    }
  }, [isValid]);


  // Server error message handler
  useEffect(() => {
    if (errorMessage) {
      document.querySelector('.show-error-message').innerHTML = errorMessage
    }
  }, [errorMessage])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })

    inputValidation(values, { [e.target.name]: refs[e.target.name] }, e, errors, (errors) => setErrors(errors));
  }

  const handleBlur = (e) => {
    inputValidation(values, { [e.target.name]: refs[e.target.name] }, e, errors, (errors) => setErrors(errors))
  }

  const handleFocus = (e) => {

    inputValidation(values, { [e.target.name]: refs[e.target.name] }, e, errors, (errors) => setErrors(errors))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    inputValidation(values, refs, e, errors, (errors) => setErrors(errors))
  }


  useEffect(() => {
    setPathname(location.pathname);
  }, []);

  return (
    <div className="form-container flex justify-center">
      {loading ?
        (
          <Spinner />
        ) : (
          <div className="form-content">
            <div className="form-logo">
              <Link to="/"><h1>Magic Find</h1></Link>
            </div>
              <div className="form-title">
                <h2>Create your account</h2>
              </div>
              <p className={errorMessage ? 'show-error-message' : 'hide'}></p>
            <form className="auth-form" name="signupForm" onSubmit={handleSubmit}>
              {
                inputs.map((input) => {
                  return <FormInput key={input.id} {...input} errors={errors} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={input.ref} />
                })
              }
              <div className="form-element">
                <Link className="link" to="/login">Already a member?</Link>
                <button className="btn" type="submit">Submit</button>
              </div>
            </form>
          </div >
        )}
    </div >
  );
};

export default Signup;
