// Dropdown menu available after successfull singin
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function AuthMenu({ authRoutes }) {
  const { logoutAction } = useAuth();
  console.log(authRoutes)

  return (
    <ul className='menu auth-nav'>
      {
        authRoutes &&
        authRoutes.map((route, index) => {
          return (
            <li key={index}>
              <NavLink className="nav-link" to={route.to} >
                {route.name}
              </NavLink>
            </li>
          )
        })
      }
      <li>
        <div className="nav-link logout" onClick={() => {
          logoutAction();
        }}>
          Logout
        </div>
      </li>
    </ul>
  );
}

export default AuthMenu;
