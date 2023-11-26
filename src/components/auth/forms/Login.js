import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Spinner from '../../layout/Spinner';
import errorHandler from './helpers/errorHandler';
import { PathContext } from '../../../contexts/PathContext';
import { api } from '../../../api/resources';

const Login = () => {
  const init = {
    email: '',
    password: '',
  }
  const [values, setValues] = useState(init);
  const [errors, setErrors] = useState(init);
  const [loading, setLoading] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setPathname } = useContext(PathContext);
  const { setUser } = useAuth();

  const inputs = {
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
  }
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const location = useLocation();
  const navigate = useNavigate();

  /**********************
  ***** useEffects  *****
  ***********************/

  // On component load
  useEffect(() => { 
    console.log(location)
    if (location.state) {
      if (location.state.message) {
        setMessage({ ...location.state.message });
      }
    }
    // Prevents Header component load
    setPathname(location.pathname);

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
              setLoading(false)
              console.log(data)
              throw new Error(JSON.stringify(data))
            })
          })
          .then((data) => {
            data.user.id = data.user._id;
            delete data.user._id;
            const user = {
              ...data.user,
              token: data.token
            }
            setLoading(false)
            setUser({ ...user });
            localStorage.setItem('user', JSON.stringify(user));
            // console.log(location?.state)
            const destination = location.state?.from ? location.state.from.pathname : '/me';
            console.log(destination)
            navigate(destination, { replace: true });
          })
          .catch((error) => {
            console.log(error)
            const errorMessage = error && JSON.parse(error.message)
            setMessage({ ...errorMessage });
            inputs.email.setCustomValidity('invalid')
            inputs.password.setCustomValidity('invalid')
            setErrors(errorHandler(values, inputs))
            setValues({ ...values, email: "", password: "" })
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
  }

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputErrors = (errorHandler(values, inputs))
    setIsSubmit(true)
    setErrors(inputErrors)
  }

  // Show passsword button handler
  const handleMouseDown = (e) => {
    // Prevents firing form
    e.preventDefault();
    !showPassword ? setShowPassword(true) : setShowPassword(false);
  }

  return (
    <div className="form-container flex justify-center">
      {
        loading ?
          (
            <Spinner />
          ) : (

            <div className="form-content">
            <div className="form-logo">
              <Link to="/"><h1>Magic Find</h1></Link>
            </div>

              {message ? (
                <div className={message.type === 'error' ? 'show-error-message' : message.type === 'success' ? 'show-success-message' : 'hide'}>

                  <h4 className="auth-message-title">{message.name ? <>{message.title} <strong>{message.name}</strong>!</> : message.title}</h4>

                  <p className="auth-message-body">{message.body}</p>
                </div>
              ) : (
                  <div className="form-title">
                <h2>Log in to your account</h2>
            </div>
              )
              } 
              <form className="auth-form" id="signin-form" name="signin-form" onSubmit={handleSubmit} noValidate>
              <div className="form-element">
                  <label htmlFor="email" className={errors.email && 'danger-color'}>{errors.email ? errors.email : 'Email'}</label>
                  <input
                    className={errors.email && 'danger-border danger-padding'}
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
                  <label htmlFor="password" className={errors.password && 'danger-color'}>{errors.password ? errors.password : 'Password'}</label>
                  <div className={`login-password-wrapper center content-height flex ${errors.password && 'danger-border'}`}>
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
              <div className="form-element flex margin-block-start-2">
                <Link className="link" to="/reset-password">Forgot password?</Link>
              </div>
              <div className="form-element">
                <Link className="link" to="/signup">Create account</Link>
                <button className="login-btn btn" type="submit">Login</button>
              </div>
            </form>
          </div>
          )

      }
    </div>
  )
}


export default Login;
