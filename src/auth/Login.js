import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../layout/Loader';
import errorHandler from './helpers/authErrorHandler';
import useAuth from '../hooks/contexthooks/useAuth';
import { api } from '../api/resources';

const INIT = {
  email: '',
  password: '',
}

const Login = () => {

  // States
  const [values, setValues] = useState(INIT);
  const [errors, setErrors] = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Routing
  const location = useLocation();
  const navigate = useNavigate();

  // Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Custom Hooks
  const { setAuth } = useAuth();

  const inputs = {
    email: emailRef.current,
    password: passwordRef.current
  }


  /**********************
  ***** useEffects  *****
  ***********************/

  // On component load
  useEffect(() => {

    // Triggers if redirected to login from singup
    if (location.state) {
      if (location.state.message) {
        setMessage({ ...location.state.message });
      }
    }
    // Set focus on email input
    emailRef?.current.focus();
  }, []);

  // Error handler 
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      // Trigger Form request handler
      setIsValidForm(true)
    } else {
      setIsSubmit(false)
    }
  }, [errors])

  // Show/hide password
  useEffect(() => {
    document.querySelector('#password').type = showPassword ? 'text' : 'password'
  }, [showPassword])

  // Form request handler 
  useEffect(() => {
    if (isValidForm) {
      setLoading(true);

      const userInput = {
        email: values.email.toLowerCase().trim(),
        password: values.password
      }

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput),
      };
      try {
        fetch(`${api.serverURL}/api/users/login`, options)
          .then((res) => {
            if (res.ok) {
              return res.json()
            }
            return res.json().then((data) => {
              throw new Error(JSON.stringify(data))
            })
          })
          .then((data) => {
            const auth = { user: data.payload.user, token: data.token }
            localStorage.setItem('auth', JSON.stringify(auth))
            setAuth(auth);
            setLoading(false)
            const destination = location.state?.from ? location.state.from.pathname : '/me';
            navigate(destination, { replace: true });
          })
          .catch((error) => {
            setMessage(JSON.parse(error.message));
            emailRef.current.blur();
            passwordRef.current.blur();
            setErrors(INIT);
            setValues({ ...values, password: "" })
            setLoading(false);
            setIsValidForm(false);
          });
      } catch (error) {
        const errorMessage = JSON.parse(error.message)
        setMessage({ ...errorMessage });
        setLoading(false);
        setIsValidForm(false);
      }
    }
  }, [isValidForm]);

  /**********************
   *** Event handlers ***
  **********************/

  // Change handler
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Focus handler
  const handleFocus = (e) => {
    // Remove submit error prop if present
    if (errors[e.target.name]) {
      const cloneErrors = { ...errors }
      delete cloneErrors[e.target.name]
      setErrors(cloneErrors)
    }
  }

  const handleBlur = (e) => {
    // console.log(e.target)
  }

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputErrors = errorHandler(values, inputs);
    setIsSubmit(true);
    setErrors(inputErrors);
  }

  // Show passsword button handler
  const handleMouseDown = (e) => {
    // Prevents firing form
    e.preventDefault();
    !showPassword ? setShowPassword(true) : setShowPassword(false);
  }

  return (
    <div className="form-content">
      <div className="form-logo">
        <Link to="/"><h1>Magic Find</h1></Link>
      </div>

      {message ? (
        <div className={
          message.type === 'error' ?
            'show-error-message' :
            message.type === 'success' ?
              'show-success-message' :
              'hide'
        }>
          <h4 className="auth-message-title">
            {
              message.name ?
                <>
                  {message.title} <strong>{message.name}</strong>!
                </> :
                message.title
            }
          </h4>
          <p className="auth-message-body text-center">{message.body}</p>
        </div>
      ) : (
        <div className="form-title">
          <h2>Log in to your account</h2>
        </div>
      )
      }
      <form className="auth-form flex column gap-2" id="signin-form" name="signin-form" onSubmit={handleSubmit} noValidate>
        <div className="form-element">
          <label htmlFor="email" className={errors.email && 'color-danger'}>{errors.email ? errors.email : 'Email'}</label>
          <input
            className={errors.email && 'border-danger danger-padding'}
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            pattern="[a-zA-Z0-9._%+\-]{3,}@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            placeholder="Email"
            ref={emailRef}
          />
        </div>
        <div className="form-element">
          <label htmlFor="password" className={errors.password && 'color-danger'}>{errors.password ? errors.password : 'Password'}</label>
          <div className={`login-password-wrapper text-center content-height flex ${errors.password && 'border-danger'}`}>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              pattern="^(?!Enter Code$).*"
              placeholder='Password'
              ref={passwordRef}
            />
            <button className="password-btn flex align-center justify-center" type="button" onMouseDown={handleMouseDown}>
              <i className={!showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
            </button>
          </div>
        </div>
        <div className="flex margin-block-start-2">
          <Link className="link push-right" to="/reset-password">Forgot password?</Link>
        </div>
        <div className="flex space-between align-center">
          <Link className="link" to="/signup">Create account</Link>
          <button className="relative btn bg-success" type="submit">
            {
              !loading ? 'Login' :
                <Loader classList='box-size-6 relative bg-transparent margin-auto' />
            }
          </button>
        </div>
      </form>
    </div>
  )
}


export default Login;
