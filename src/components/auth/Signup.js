// import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import useRegister from '../hooks/useRegister';
// import validate from '../utilities/validateRegister';
// import { api } from '../../api/resources';
// import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';
import inputValidation from '../utilities/validateSignup';
import { api } from '../../api/resources';
import Spinner from '../layout/Spinner';

const Signup = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [country, setCountry] = useState('');
  // const [password, setPassword] = useState('');
  // const [password2, setPassword2] = useState('');
  // const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory();

  // const callback = (values) => {
  //   setName(values.name);
  //   setEmail(values.email);
  //   setCountry(values.country);
  //   setPassword(values.password);
  //   setPassword2(values.password2);
  //   setIsValid(true);
  // };

  // const { handleChange, values, handleClick, errors } = useRegister(
  //   callback,
  //   validate
  // );

  // const clearFields = () => {
  //   setName('');
  //   setEmail('');
  //   setCountry('');
  //   setPassword('');
  //   setPassword2('');
  //   setIsValid(false);
  // };

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
    // if (isValid) {
    //   const newUser = {
    //     name,
    //     email,
    //     country,
    //     password,
    //   };
    //   const options = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newUser),
    //   };
    //   fetch(`${api.serverURL}/api/users`, options)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log('data', data);

    //       history.push('/login');
    //     })
    //     .catch((error) => console.log(error));
    // }
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

    // <form className="form">
    //   <h2 className="page-title">Register</h2>
    //   <div className="form-element">
    //     {errors.name ? (
    //       <p className="error">{errors.name}</p>
    //     ) : (
    //       <label htmlFor="name">Name:</label>
    //     )}
    //     <input
    //       className={errors.name && 'empty-field'}
    //       id="name"
    //       type="text"
    //       name="name"
    //       value={values.name}
    //       onChange={handleChange}
    //       placeholder="Name"
    //     />
    //   </div>
    //   <div className="form-element">
    //     {errors.email ? (
    //       <p className="error">{errors.email}</p>
    //     ) : (
    //       <label htmlFor="email">Email:</label>
    //     )}
    //     <input
    //       className={errors.email && 'empty-field'}
    //       id="email"
    //       type="text"
    //       name="email"
    //       value={values.email}
    //       onChange={handleChange}
    //       placeholder="Email"
    //     />
    //   </div>
    //   <div className="form-element">
    //     {errors.country ? (
    //       <p className="error">{errors.country}</p>
    //     ) : (
    //       <label htmlFor="country">Country:</label>
    //     )}
    //     <input
    //       className={errors.country && 'empty-field'}
    //       id="country"
    //       type="text"
    //       name="country"
    //       value={values.country}
    //       onChange={handleChange}
    //       placeholder="Country"
    //     />
    //   </div>
    //   <div className="form-element">
    //     {errors.password ? (
    //       <p className="error">{errors.password}</p>
    //     ) : (
    //       <label htmlFor="password">Password:</label>
    //     )}
    //     <input
    //       className={errors.password && 'empty-field'}
    //       id="password"
    //       type="password"
    //       name="password"
    //       onChange={handleChange}
    //       placeholder="Password"
    //     />
    //   </div>
    //   <div className="form-element">
    //     {errors.password2 ? (
    //       <p className="error">{errors.password2}</p>
    //     ) : (
    //       <label htmlFor="password2">Repeat Password:</label>
    //     )}

    //     <input
    //       className={errors.password2 && 'empty-field'}
    //       id="password2"
    //       type="password"
    //       name="password2"
    //       value={values.password2}
    //       onChange={handleChange}
    //       placeholder="Repeat Password"
    //     />
    //     <div className="item-buttons">
    //       <button className="item-button primary " onClick={clearFields}>
    //         Clear
    //       </button>
    //       <button className="item-button success" onClick={handleClick}>
    //         Register
    //       </button>
    //     </div>
    //   </div>
    // </form>
    <div className="container flex justify-center">
      {loading ?
        (
          <Spinner />
        ) : (
          <div className="form-content">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-title">
                <h2>Create your account</h2>
              </div>
              <p className={errorMessage ? 'show-error-message' : 'hide'}></p>
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
                  value={!errors.matching_passwords ? values.password : ''}
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
                  value={!errors.matching_passwords ? values.repeat_password : ''}
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
