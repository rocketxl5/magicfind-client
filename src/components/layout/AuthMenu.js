// Dropdown menu available after successfull singin
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';

function AuthMenu() {
  const navigate = useNavigate();
  const { setUser, setUnreadMail } = useAuth();
  const { setCartItems, setItemsCount } = useContext(ShoppingCartContext);

  // Sign out user
  const handleClick = () => {
    localStorage.clear();
    setUser(null);
    setUnreadMail(0);
    setCartItems([]);
    setItemsCount(0);   
    navigate('/');
  };
  return (
    <ul className='menu main-menu'>
      <li >
        <Link className="nav-link" to="/search-collection">
          Search Collection
        </Link>
      </li>
      <li >
        <Link className="nav-link" to="/search-api">
          Search API
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
