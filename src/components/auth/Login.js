import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import inputValidation from '../utilities/validateLogin';
import useFormValidation from '../hooks/useFormValidation'
import { UserContext } from '../../contexts/UserContext';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import Spinner from '../layout/Spinner';

const Login = () => {
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const { setPath } = useContext(PathContext);
  const { setUser } = useContext(UserContext);

  const location = useLocation();
  const history = useHistory();

  // Setting path with component url pathname
  setPath(location.pathname);

  const callback = (values) => {
    setInput(values)
    setIsValid(true)
  }

  const { handleChange, handleFocus, handleBlur, handleSubmit, setValues, values, errors } = useFormValidation(
    callback,
    inputValidation,
    {
      email: '',
      password: ''
    }
  )

  const handleClick = (e) => {
    // Prevents firing form
    e.preventDefault()
    !showPassword ? setShowPassword(true) : setShowPassword(false)
  }

  // Show/hide password
  useEffect(() => {
    document.querySelector('#password').type = showPassword ? 'text' : 'password'
  }, [showPassword])

  useEffect(() => {
    if (isValid) {
      setLoading(true);

      // if errorMessage already containes a message
      // change errorMessage to empty string
      if (errorMessage) {
        setErrorMessage('')
      }

      const userInput = {
        email: input.email,
        password: input.password
      }

      console.log(userInput)
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

          // return res.text().then((text) => {
          //   setLoading(false)
          //   throw new Error(text);
          // });
          return res.json().then((data) => {
            setLoading(false)
            throw new Error(JSON.stringify(data))
          })
        })
          .then((data) => {

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
          setLoading(false)
          setErrorMessage(error.message)
          setValues({
            email: '',
            password: ''
          })
          setIsValid(false)
          console.log(error);
        });
      } catch (error) {
        setLoading(false)
        setErrorMessage(error.message);
        console.log(error)
      }
    }
  }, [isValid]);

  // error message handler
  useEffect(() => {
    if (errorMessage) {
      document.querySelector('.show-error-message').innerHTML = errorMessage.replaceAll('"', '')
    }
  }, [errorMessage])

  return (
    <div className="container flex justify-center">
      {loading ?
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
              <p className={errorMessage ? 'show-error-message' : 'hide'}></p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-element">
                <label htmlFor="name">Email</label>
                <input
                  className={errors.email && 'input-error'}
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.email ? errors.email : "Email"} />
              </div>
              <div className="form-element">
                <label htmlFor="password">Password</label>
                <div className={`login-password center content-height flex ${errors.password && 'input-error'}`}>
                  <input
                    className={errors.password && 'input-error'}
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder={errors.password ? errors.password : "Password"}
                  />
                  <button className="password-btn flex align-center justify-center" onClick={handleClick}>
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
        )}
    </div>
  )
}


export default Login;
