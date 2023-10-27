import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import inputValidation from '../utilities/validateSignup';
import useFormValidation from '../hooks/useFormValidation';
import { PathContext } from '../../contexts/PathContext';
import { api } from '../../api/resources';
import Spinner from '../layout/Spinner';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setPathname } = useContext(PathContext);

  const location = useLocation();
  const history = useHistory();

  const callback = (values) => {
    setInput(values);
    setIsValid(true);
  }

  const {
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    values,
    errors
  } = useFormValidation(
    callback, 
    inputValidation,
    {
      username: '',
      email: '',
      country: '',
      password: '',
      repeat_password: '',
      matching_passwords: '',
    },
    (message) => { setErrorMessage(message) });

  // Setting path with component url pathname onload
  useEffect(() => {
    setPathname(location.pathname);
  }, [])

  // Submit post request to backend
  useEffect(() => {
    if (isValid) {
      setLoading(true);
      console.log(input)
      const userInput = {
        name: input.username,
        email: input.email,
        country: input.country,
        password: input.password,
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userInput)
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
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-element">
                <label htmlFor="username">Username</label>
                <input
                  className={errors.username && 'input-error'}
                  id="username"
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.username ? errors.username : "Username"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="email">Email</label>
                <input
                  className={errors.email && 'input-error'}
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.email ? errors.email : "Email"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="country">Country</label>
                <input
                  className={errors.country && 'input-error'}
                  id="country"
                  type="country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.country ? errors.country : "Country"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="password">Password</label>
                <input
                  className={(errors.password || errors.matching_passwords) && 'input-error'}
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.password ? errors.password : "Password"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="repeat_password">Repeat password</label>
                <input
                  className={(errors.password || errors.matching_passwords) && 'input-error'}
                  id="repeat_password"
                  type="password"
                  name="repeat_password"
                  value={values.repeat_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.repeat_password ? errors.password : "Repeat Password"}
                />
              </div>
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
