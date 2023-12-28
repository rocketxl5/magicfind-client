// Dropdown menu available after successfull singin
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function AuthMenu({ auth, authPaths }) {
  const { logoutAction } = useAuth();

  return (
    <ul className='menu auth-nav'>
      {
        authPaths.map((path, index) => {
          return (
            <li key={index}>
              <NavLink className="nav-link" to={path.to} >
                {path.name}
              </NavLink>
            </li>
          )
        })
      }

      <li>
        <div className="nav-link signout" onClick={() => logoutAction()}>
          Logout
        </div>
      </li>
    </ul>
  );
}

export default AuthMenu;
