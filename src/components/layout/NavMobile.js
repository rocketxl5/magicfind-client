import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthMenu from './AuthMenu';
import { UserContext } from '../../contexts/UserContext';

const Navbar = ({ navCheckBox, searchCheckbox }) => {
  const [display, setDisplay] = useState(true);
  const { user, setUser } = useContext(UserContext);
  // console.log(navCheckBox.current.checked);

  const handleClick = (e) => {
    const checkbox = document.getElementById('nav-toggle');
    checkbox.checked = false;
  };

  // If nav checkbox is checked, uncheck search checkbox
  // This closes search field when hamburger is clicked on
  const handleChange = (e) => {
    console.log(navCheckBox.current.checked);
    if (navCheckBox.current.checked && searchCheckbox.current.checked) {
      searchCheckbox.current.checked = false;
    }

    if (navCheckBox.current.checked) {
      setDisplay(true);
    }
  };

  return (
    <Fragment>
      <input
        type="checkbox"
        id="nav-toggle"
        className="nav-toggle"
        ref={navCheckBox}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
      <nav id="navbar" className="navbar">
        <ul
          id="nav-list"
          className="nav--list-items"
          onClick={(e) => handleClick(e)}
        >
          {!user ? (
            <Fragment>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              {display ? (
                <AuthMenu setDisplay={setDisplay} setUser={setUser} />
              ) : (
                ''
              )}
            </Fragment>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
