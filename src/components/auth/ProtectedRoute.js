import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = (props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />
  }
  return <Route {...props} />
};

export default ProtectedRoute;
