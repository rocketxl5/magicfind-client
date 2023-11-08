import React, { useRef, useState, useEffect, useContext, useReducer } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import FormInput from './FormInput';
import Spinner from '../layout/Spinner';
import reducer from './reducer/inputReducer';
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
  const [isValidForm, setIsValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
        { text: 'Must begin with a letter', pattern: /^[a-z][a-z0-9]*$/, fullfiled: false },
        { text: 'Lowercase letters & numbers', pattern: /^[a-z0-9]{3,}$/, fullfiled: false },
        { text: '3 to 12 characters', pattern: /^[a-z0-9]{3,12}$/, fullfiled: false },
      ]
    },
    {
      name: 'email',
      type: 'email',
      value: values.email,
      placeholder: 'Email',
      label: 'Email',
      ref: emailRef,
      pattern: '[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}',
      requirements: [
        { text: 'Enter a valid email address', pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, fullfiled: false }
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
      pattern: '(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}',
      requirements: [
        { text: 'Must begin with a letter', pattern: /^[a-zA-Z]+/, fullfiled: false },
        { text: 'One capital letter', pattern: /[A-Z]+/, fullfiled: false },
        { text: 'One number', pattern: /^(?=.*[a-zA-Z]).*[0-9].*$/, fullfiled: false },
        { text: 'One special character: [! @ # $ % ^ & *]', pattern: /^(?=.*[a-zA-Z]).*[!@#$%^&*].*$/, fullfiled: false },
        { text: '8 to 16 characters long', pattern: /^.{8,16}$/, fullfiled: false },
      ]
    },
    {
      name: 'confirmPassword',
      type: 'password',
      value: values.confirmPassword,
      placeholder: 'Confirm Password',
      label: 'Confirm Password',
      ref: confirmPasswordRef,
      pattern: `${values.password}`,
      requirements: [
        { text: 'Passwords must match', pattern: new RegExp(values.password), fullfiled: false }
      ],
    }
  ];

  // Form inputs Reducer hook
  const [inputStates, dispatch] = useReducer(reducer, [])
  // Setting current path name
  const { setPathname } = useContext(PathContext);

  const location = useLocation();
  const history = useHistory();

  // Sets useReducer dispatch action object
  const getDispatchAction = (e) => {
    // Submit event 
    if (e.type === 'submit') {
      return {
        type: e.type,
        payload: {
          values: values,
          inputs: refs,
          requirements: inputs.map(input => {
            return { [input.name]: input.requirements }
          })
        }
      }
    }
    // Change, Focus, Blur events
    return {
      type: e.type,
      payload: {
        values: values,
        input: refs[e.target.name],
        requirements: inputs[e.target.id].requirements,
      }
    }
  }


  useEffect(() => {
    if (isValidForm) {
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
            setIsValidForm(false)
          })
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
      }
    }
  }, [isValidForm]);

  // Server error message handler
  useEffect(() => {
    if (errorMessage) {
      document.querySelector('.show-error-message').innerHTML = errorMessage
    }
  }, [errorMessage])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    dispatch(getDispatchAction(e))
  }

  const handleFocus = (e) => {
    dispatch(getDispatchAction(e))
  }

  const handleBlur = (e) => {
    dispatch(getDispatchAction(e))
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    dispatch(getDispatchAction(e))
  }

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
              <p className={errorMessage ? 'show-error-message' : 'hide'}></p>
            <form className="auth-form" name="signupForm" onSubmit={handleSubmit}>
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
