// Dropdown menu available after successfull singin
import { NavLink } from 'react-router-dom';
import data from '../../assets/data/routes.json'
import useAuth from '../../hooks/useAuth';

function AuthMenu() {
  const { logoutAction } = useAuth();
  const { authRoutes } = data;

  return (
    <ul className='menu auth-nav'>
      {
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
