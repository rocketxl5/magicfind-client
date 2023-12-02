import React, { useRef, useState, useEffect, useContext, useReducer } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../layout/Loading';
import FormInput from './FormInput';
import reducer from './reducer/inputReducer';
import errorHandler from './helpers/errorHandler';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';

const Signup = () => {
  const init = {
    username: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: ''
  }
  const [values, setValues] = useState(init);
  const [errors, setErrors] = useState(init);
  const [loading, setLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false)
  // On submit error object for empty or invalid inputs
  // Sever side error message if username or email already taken
  const [message, setMessage] = useState('');

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

  // Input attribute/value pair with requirements array of object
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
        { text: '3 to 12 characters', pattern: /^.{3,12}$/, fullfiled: false },
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
        { text: 'Enter a valid email address', pattern: /^[a-zA-Z0-9._%+\-]{3,}@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/, fullfiled: false }
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
      pattern: '^(?=[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,16}$',
      requirements: [
        { text: 'Must begin with a letter', pattern: /^[a-zA-Z]+/, fullfiled: false },
        { text: 'One lowercase letter', pattern: /^(?=.*[a-zA-Z]).*[a-z].*$/, fullfiled: false },
        { text: 'One uppercase letter', pattern: /^(?=.*[a-zA-Z]).*[A-Z].*$/, fullfiled: false },
        { text: 'One number', pattern: /^.+(?=.*[0-9]).*$/, fullfiled: false },
        { text: 'One special character: !@#$%^&*', pattern: /^.+(?=.*[!@#$%^&*]).*$/, fullfiled: false },
        { text: '8 to 16 characters long', pattern: /^.{8,16}$/, fullfiled: false },
        { text: 'Valid character', pattern: /^[a-zA-Z]+[a-zA-Z0-9!@#$%^&*]*$/, fullfiled: false },
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
          pattern: `^${values.password}$`,
          fullfiled: false
        }
      ]
    }
  ];

  // Set useReducer hook
  const [inputStates, dispatch] = useReducer(
    reducer,
    (function () {
      let state = {}
      for (const prop in init) {
        state = { ...state, [prop]: [] }
      }
      return state
    })(init)
  )

  // Setting current path name
  const { setPathname } = useContext(PathContext);

  const location = useLocation();
  const navigate = useNavigate();


  /**********************
  ***** useEffects  *****
  ***********************/

  // On component load
  useEffect(() => {
    // Prevents Header component load
    setPathname(location.pathname);
  }, []);

  // Error handler
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      // Triggers Form request handler
      setIsValidForm(true)
    } else {
      setIsSubmit(false)
    }
  }, [errors])

  // Form request handler 
  useEffect(() => {
    if (isValidForm) {
      setLoading(true);

      const inputValues = {
        name: values.username.trim(),
        email: values.email.trim(),
        country: values.country.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValues)
      }

      try {
        fetch(`${api.serverURL}/api/users/signup`, options)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            return res.json().then((data) => {
              setLoading(false)
              throw new Error(JSON.stringify(data))
            })
          })
          .then(data => {
            navigate('/login', { state: { message: data.message } }, { replace: true });
          })
          .catch(error => {
            setMessage(error.message)
            setIsValidForm(false)
            setLoading(false);
          })
      } catch (error) {
        setLoading(false);
        setMessage(error.message);
        setIsValidForm(false)
      }
    }
  }, [isValidForm]);


  /**********************
   *** Event handlers ***
   **********************/

  // Change handler
  const handleChange = (e) => {
    // Set input state values
    setValues({ ...values, [e.target.name]: e.target.value })

    // Set input validity prop value to valid
    if (!e.target.checkValidity()) {
      e.target.setCustomValidity('')
    }
    // Set input validity prop value to invalid
    if (e.target.checkValidity() && !e.target.value) {
      e.target.setCustomValidity('invalid')
    }

    if (!e.target.value) {
      e.target.setCustomValidity('')
    }

    // Generate dispatch payload object
    const payload = e.target.name !== 'password' ?
      {
        name: e.target.name,
        values: { input: e.target.value },
        requirements: { input: inputs[e.target.id].requirements }
      } : {
        name: e.target.name,
        values: {
          password: e.target.value,
          confirmPassword: refs.confirmPassword.value,
        },
        requirements: {
          password: inputs[e.target.id].requirements,
          confirmPassword: inputs[inputs.length - 1].requirements
        },
      }
    // Call dispatch reducer function
    dispatch({
      type: e.type,
      payload: { ...payload }
    })
  }

  // Focus handler
  const handleFocus = (e) => {
    // Remove input error if any
    if (errors[e.target.name]) {
      const cloneErrors = { ...errors }
      delete cloneErrors[e.target.name]
      setErrors(cloneErrors)
    }

    // Set input validity to display requirements message 
    if (!e.target.value) {
      e.target.setCustomValidity('invalid')
    }

    // Call dispatch reducer function
    dispatch({
      type: e.type,
      payload: {
        name: e.target.name,
        value: e.target.value,
        requirements: inputs[e.target.id].requirements,
      }
    })
  }

  // Blur handler
  const handleBlur = (e) => {
    // Set input validity to hide requirements message
    !e.target.value && e.target.setCustomValidity('')
  }

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputErrors = (errorHandler(values, refs))
    setIsSubmit(true)
    setErrors(inputErrors)
  }

  return (
    <div className="form-container flex justify-center">
      {loading ?
        (
          <Loading />
        ) : (
          <div className="form-content">
            <div className="form-logo">
              <Link to="/"><h1>Magic Find</h1></Link>
            </div>
            <div className="form-title">
              <h2>Create your account</h2>
            </div>
            <div className={message ? 'show-error-message' : 'hide'}>
              <p>{message.replace(/['"]+/g, '')}</p>
            </div>
            <form className="auth-form" id="singup-form" name="singup-form" onSubmit={handleSubmit} noValidate>
              {
                // Map inputs array
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
