import React, { useRef, useState, useEffect, useContext, useReducer } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import FormInput from './FormInput';
import Spinner from '../../layout/Spinner';
import reducer from './reducer/inputReducer';
import handleErrors from './helpers/handleErrors';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  // On submit error object for empty or invalid inputs
  // Sever side error message if username or email already taken
  const [requestError, setRequestError] = useState('');

  // Input refs 
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
    {
      name: 'username',
      type: 'text',
      value: values.username,
      placeholder: 'Username',
      label: 'Username',
      ref: usernameRef,
      pattern: '(?=.*[a-z])[a-z0-9]{3,12}',
      requirements: [
        { text: 'Must begin with a letter', pattern: /^[a-z]+.*$/, fullfiled: false },
        { text: 'Lowercase letters & numbers', pattern: /^(?=.*[a-z])[a-z0-9]{2,}$/, fullfiled: false },
        { text: '5 to 12 characters', pattern: /^.{3,12}$/, fullfiled: false },
      ]
    },
    {
      name: 'email',
      type: 'email',
      value: values.email,
      placeholder: 'Email',
      label: 'Email',
      ref: emailRef,
      pattern: '[a-zA-Z0-9._%+\\-]{3,}@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}',
      requirements: [
        { text: 'Enter a valid email address', pattern: /^\w+([\.-]?\w+){3,}@\w+([\.-]?\w+)*(\.\w{2,})+$/, fullfiled: false }
      ]
    },
    {
      name: 'country',
      type: 'text',
      value: values.country,
      placeholder: 'Country',
      label: 'Country',
      ref: countryRef,
      pattern: '[a-zA-Z]{3,}',
      requirements: [
        { text: 'The country you currently live in', pattern: /^[a-zA-Z]{3,40}$/, fullfiled: false }
      ]
    },
    {
      name: 'password',
      type: 'password',
      value: values.password,
      placeholder: 'Password',
      label: 'Password',
      ref: passwordRef,
      pattern: '^[a-zA-Z]+(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{7,16}$',
      requirements: [
        { text: 'Must begin with a letter', pattern: /^[a-zA-Z]+/, fullfiled: false },
        { text: 'One capital letter', pattern: /^(?=.*[a-zA-Z]).*[A-Z].*$/, fullfiled: false },
        { text: 'One number', pattern: /^[a-zA-Z].*(?=.*[0-9]).*$/, fullfiled: false },
        { text: 'One special character: [! @ # $ % ^ & *]', pattern: /^[a-zA-Z].*(?=.*[!@#$%^&*]).*$/, fullfiled: false },
        { text: '8 to 16 characters long', pattern: /^.{8,16}$/, fullfiled: false },
        { text: 'Valid character', pattern: /^[a-zA-Z0-9!@#$%^&*]*$/, fullfiled: false },
      ]
    },
    {
      name: 'confirmPassword',
      type: 'password',
      value: values.confirmPassword,
      placeholder: 'Confirm Password',
      label: 'Confirm Password',
      ref: confirmPasswordRef,
      pattern: values.password,
      requirements: [
        {
          text: 'Passwords must match',
          pattern: values.password,
          fullfiled: false
        }
      ]
    }
  ];

  // Form inputs Reducer hook
  const [inputStates, dispatch] = useReducer(reducer, [])
  // Setting current path name
  const { setPathname } = useContext(PathContext);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (isValidForm) {
      setLoading(true);

      const inputValues = {
        username: values.username.trim(),
        email: values.email.trim(),
        country: values.country.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(inputValues)
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
            setRequestError(error.message)
            setIsValidForm(false)
          })
      } catch (error) {
        setLoading(false);
        setRequestError(error.message);
      }
    }
  }, [isValidForm]);

  // Server error message handler
  useEffect(() => {
    if (requestError) {
      document.querySelector('.show-error-message').innerHTML = requestError
    }
  }, [requestError])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })

    dispatch({
      type: e.type,
      payload: {
        values: values,
        input: refs[e.target.name],
        requirements: inputs[e.target.id].requirements,
      }
    })
  }

  const handleFocus = (e) => {
    // Remove submit error prop if any
    if (errors[e.target.name]) {
      const newErrors = { ...errors }
      delete newErrors[e.target.name]
      setErrors(newErrors)
    }

    dispatch({
      type: e.type,
      payload: {
        values: values,
        input: refs[e.target.name],
        requirements: inputs[e.target.id].requirements,
      }
    })
  }

  const handleBlur = (e) => {
    dispatch({
      type: e.type,
      payload: {
        values: values,
        input: refs[e.target.name],
        requirements: inputs[e.target.id].requirements,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(handleErrors(values, refs))

  }

  useEffect(() => {
    // Object.keys(errors).length === 0 && setIsValidForm(true)
    // console.log(errors)
  }, [errors])

  // Set path name
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
            <p className={requestError ? 'show-error-message' : 'hide'}></p>
            <form className="auth-form" name="signupForm" onSubmit={handleSubmit} noValidate>
              {
                inputs.map((input, index) => {
                  return <FormInput
                    key={index}
                    id={index}
                    {...input}
                    inputState={inputStates[input.name]}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    errors={errors}
                    ref={input.ref} />
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
