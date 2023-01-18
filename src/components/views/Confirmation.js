import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Confirmation = () => {
  return (
    <Fragment>
      {' '}
      <div>Confirmation</div>
      <div>
        <Link to="/">Back to Home Page</Link>
      </div>
    </Fragment>
  );
};

export default Confirmation;
