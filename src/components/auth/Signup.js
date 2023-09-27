import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';
import inputValidation from '../utilities/validateSignup';
import { api } from '../../api/resources';
import Spinner from '../layout/Spinner';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory();

  const callback = (values) => {
    setInput(values)
    setIsValid(true)
  }

  const { handleChange, handleFocus, handleBlur, handleSubmit, values, errors } = useFormValidation(
    callback,
    inputValidation,
    {
      name: '',
      email: '',
      country: '',
      password: '',
      repeat_password: '',
      matching_passwords: '',
    }
  )

  useEffect(() => {
    if (isValid) {
      const userInput = {
        name: input.name,
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
            history.push('/login');
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
    <div className="container flex justify-center">
      {loading ?
        (
          <Spinner />
        ) : (
          <div className="form-content">
              <div className="form-title">
                <h2>Create your account</h2>
              </div>
              <p className={errorMessage ? 'show-error-message' : 'hide'}></p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-element">
                <label htmlFor="name">Username</label>
                <input
                  className={errors.name && 'input-error'}
                  id="name"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.name ? errors.name : "Username"}
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
                  value={!errors.matching_passwords ? values.password : values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.password ? errors.password : errors.matching_passwords ? errors.matching_passwords : "Password"}
                />
              </div>
              <div className="form-element">
                <label htmlFor="password_repeat">Repeat password</label>
                <input
                  className={(errors.password || errors.matching_passwords) && 'input-error'}
                  id="repeat_password"
                  type="text"
                  name="repeat_password"
                  value={!errors.matching_passwords ? values.repeat_password : values.repeat_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  placeholder={errors.password ? errors.password : errors.matching_passwords ? errors.matching_passwords : "Password"}
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
