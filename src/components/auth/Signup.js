import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import FormInput from './FormInput';


import Spinner from '../layout/Spinner';
import inputValidation from './helpers/validateSingup';
// import useFormValidation from '../hooks/useFormValidation';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';

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

  const params = {
    username: {
      pattern: /^(?=.*[a-z])[a-z0-9]{3,12}$/,
      error: 'Must be 3 to 12 characters long. Lowercase letters and numbers only.'
    },
    email: {
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      error: 'Please provide a valid email address'
    },
    country: {
      pattern: /^[a-zA-Z]+$/,
      error: 'Must only be letters'
    },
    password: {
      pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/,
      error: 'Must be 6 to 12 characters long. With at least 1 capital letter, 1 number, 1 special character'
    },
    confirmPassword: {
      pattern: new RegExp(values.password),
      error: 'Passwords don\'t match'
    }
  }

  const inputs = [
    { id: 1, name: 'username', type: 'text', value: values.username, placeholder: 'Username', label: 'Username' },
    { id: 2, name: 'email', type: 'text', value: values.email, placeholder: 'Email', label: 'Email' },
    { id: 3, name: 'country', type: 'text', value: values.country, placeholder: 'Country', label: 'Country' },
    { id: 4, name: 'password', type: 'password', value: values.password, placeholder: 'Password', label: 'Password' },
    { id: 5, name: 'confirmPassword', type: 'password', value: values.confirmPassword, placeholder: 'Confirm Password', label: 'Confirm Password' },
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

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputErrors = inputValidation(values, e.target);
    // If at least 1 error, update errors state
    Object.keys(inputErrors).length && setErrors(inputErrors)
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
                  return <FormInput key={input.id} values={values} param={params[input.name]} {...input} errors={errors} setErrors={(state) => setErrors(state)} onChange={onChange} />
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
