// Dropdown menu available after successfull singin
import React, { Fragment, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
function AuthMenu({ setDisplay, setUser }) {
  const history = useHistory();
  const { setUnreadMail } = useContext(UserContext);
  const { setCartItems, setItemsCount } = useContext(ShoppingCartContext);

  const singout = () => {
    localStorage.clear();
    setUser(null);
    setUnreadMail(0);
    setCartItems([]);
    setItemsCount(0);
    history.push('/');
  };
  return (
    <Fragment>
      <li>
        <Link onClick={(e) => setDisplay(false)} to="/store">
          Store
        </Link>
      </li>
      <li>
        <Link onClick={(e) => setDisplay(false)} to="/profile">
          Profile
        </Link>
      </li>
      <li>
        <Link onClick={(e) => setDisplay(false)} to="/settings">
          Settings
        </Link>
      </li>
      <li>
        <div className="signout" onClick={() => singout()}>
          Logout
        </div>
      </li>
    </Fragment>
  );
}

export default AuthMenu;
