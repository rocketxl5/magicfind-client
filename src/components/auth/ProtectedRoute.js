import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = (props) => {
  const { user } = useAuth();
  const location = useLocation(); 
  console.log(location)
  // const data = location.state;
  // const storage = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Redirect to="/" />
  }
  return <Route {...props} />
};

export default ProtectedRoute;
