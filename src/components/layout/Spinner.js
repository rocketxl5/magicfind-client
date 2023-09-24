import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div className="container flex flex-column align-center col-12">
      <div className="col-12 center">
        <img
          className="spinner"
          src={spinner}
          alt="Spinner"
        />
        <p>Retrieving your data...</p>
      </div>
    </div>
  );
};

export default Spinner;
