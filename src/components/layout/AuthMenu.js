// Dropdown menu available after successfull singin
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';

function AuthMenu({ user, setUser }) {
  const history = useHistory();
  const { setUnreadMail } = useContext(UserContext);
  const { setCartItems, setItemsCount } = useContext(ShoppingCartContext);

  // Sign out user
  const handleClick = () => {
    localStorage.clear();
    setUser(null);
    setUnreadMail(0);
    setCartItems([]);
    setItemsCount(0);   
    history.push('/');
  };
  return (
    <ul className='menu main-menu'>
      <li >
        <Link className="nav-link" to="/store">
          Store
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/profile">
          Profile
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/settings">
          Settings
        </Link>
      </li>
      <li>
        <div className="nav-link signout" onClick={handleClick}>
          Logout
        </div>
      </li>
    </ul>
  );
}

export default AuthMenu;
