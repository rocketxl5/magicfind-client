import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import validate from '../utilities/validateLogin';
import { UserContext } from '../../contexts/UserContext';
import { api } from '../../api/resources';
import styled from 'styled-components';

import Spinner from '../layout/Spinner'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false)

  const history = useHistory();

  const callback = (values) => {
    setEmail(values.email);
    setPassword(values.password);
    setIsValid(true);
  };

  const { handleChange, values, handleClick, errors } = useLogin(
    callback,
    validate
  );

  useEffect(() => {
    console.log(loading)
    if (isValid) {
      setLoading(true);

      const userInput = {
        email,
        password,
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput),
      };
      fetch(`${api.serverURL}/api/users/login`, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return res.text().then((text) => {
            setLoading(false)
            throw new Error(text);
          });
        })
        .then((data) => {
          // console.log(data.data);
          setLoading(false)
          const user = {
            auth: true,
            token: data.token,
            name: data.data.name,
            email: data.data.email,
            country: data.data.country,
            id: data.data._id,
            cards: data.data.cards,
            date: data.data.date,
            messages: data.data.messages,
          };
          setUser(user);

          localStorage.setItem('user', JSON.stringify(user));
          history.push({
            pathname: '/me',
          });
        })
        .catch((error) => {
          setLoading(false)
          console.log(error);
        });
    }
  }, [isValid]);

  return (
    <div className="form-container">
      {loading ?
        (
          <Spinner />
        ) : (
      <form className="form">
        <h2 className="page-title">Login</h2>
        <Error></Error>
        <div className="form-element">
          {errors.email ? (
            <p className="error">{errors.email}</p>
          ) : (
            <label htmlFor="email">Email:</label>
          )}
          <input
            className={errors.email && 'empty-field'}
            id="email"
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="form-element">
          {errors.password ? (
            <p className="error">{errors.password}</p>
          ) : (
            <label htmlFor="password">Password:</label>
          )}
          <input
            className={errors.password && 'empty-field'}
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <div className="item-buttons push-right">
            <button className="item-button success" onClick={handleClick}>
              Log In
            </button>
          </div>
        </div>
      </form>
        )}
    </div>
  );
};

const Error = styled.div`
  display: none;
`;

export default Login;
