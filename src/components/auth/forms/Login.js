import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import FormInput from './FormInput';
import errorHandler from './helpers/errorHandler';
import { UserContext } from '../../../contexts/UserContext';
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
  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [succesMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { setPathname } = useContext(PathContext);
  const { setUser } = useContext(UserContext);

  const inputs = {
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
  }

  const location = useLocation();
  const history = useHistory();


  // Show passsword button handler
  const handleMouseDown = (e) => {
    // Prevents firing form
    e.preventDefault();
    !showPassword ? setShowPassword(true) : setShowPassword(false);
  }

  // Setting path with component url pathname onload
  useEffect(() => {
    if (location.state) {
      if (location.state.message) {
        setSuccessMessage(location.state.message);
      }
    }
    setPathname(location.pathname);
  }, []);

  // Show/hide password
  useEffect(() => {
    document.querySelector('#password').type = showPassword ? 'text' : 'password'
  }, [showPassword])

  useEffect(() => {
    if (validForm) {
      setLoading(true);

      const userInput = {
        email: values.email.trim(),
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
              return res.json();
            }

            return res.json().then((data) => {
              setLoading(false)
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
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            history.push({
              pathname: '/me',
            });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error.message)
            setErrorMessage(error.message);
            setValidForm(false);
          });
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
      }
    }
  }, [validForm]);

  // error message handler
  useEffect(() => {
    if (errorMessage) {
      document.querySelector('.show-error-message').innerHTML = errorMessage.replaceAll('"', '')
    }

    if (succesMessage) {
      document.querySelector('.show-success-message').innerHTML = succesMessage.replaceAll('"', '')
    }
  }, [errorMessage, succesMessage])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleFocus = (e) => {
    // Remove submit error prop if present
    if (errors[e.target.name]) {
      const newErrors = { ...errors }
      delete newErrors[e.target.name]
      setErrors(newErrors)
    }

  }

  const handleBlur = (e) => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputErrors = (errorHandler(values, inputs))
    setErrors(prev => prev = inputErrors)
  }

  useEffect(() => {
    if (!Object.keys(errors).length) {
      setValidForm(true)
    }
  }, [errors])


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
            <div className="form-title">
              <h2>Log in to your account</h2>
            </div>
            <p className={errorMessage ? 'show-error-message' : succesMessage ? 'show-success-message' : 'hide'}></p>
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
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    pattern="^(?!Enter Code$).*"
                    placeholder="Email"
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
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                      pattern="^(?!Enter Code$).*"
                      placeholder='Password'
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
