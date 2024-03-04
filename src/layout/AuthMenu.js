// Dropdown menu available after successfull singin
import { NavLink, useNavigate } from 'react-router-dom';
import data from '../data/ROUTES.json';
import useAuth from '../hooks/useAuth';

function AuthMenu() {
  const { logoutAction } = useAuth();
  const navigate = useNavigate();
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
          navigate('/login');
        }}>
          Logout
        </div>
      </li>
    </ul>
  );
}

export default AuthMenu;
