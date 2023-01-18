import React, { useContext } from 'react';
import { RouteContext } from '../../contexts/RouteContext';
const NotFound = () => {
  const { setNotFound } = useContext(RouteContext);
  setNotFound(true);
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

export default NotFound;
