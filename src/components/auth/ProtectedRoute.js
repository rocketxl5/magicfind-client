import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import UserPage from '../views/UserPage';

const ProtectedRoute = () => {
  const location = useLocation();
  const data = location.state;
  const storage = JSON.parse(localStorage.getItem('user'));
  console.log(location.state);
  console.log(storage);
  return <Route>{data ? <UserPage /> : <Redirect to="/" />}</Route>;
};

export default ProtectedRoute;
