// Dropdown menu available after successfull singin
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function AuthMenu() {
  const { logoutAction } = useAuth();

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
        <div className="nav-link signout" onClick={() => logoutAction()}>
          Logout
        </div>
      </li>
    </ul>
  );
}

export default AuthMenu;
