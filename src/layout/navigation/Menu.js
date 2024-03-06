// Dropdown menu available after successfull singin
import { NavLink, useNavigate } from 'react-router-dom';
import data from '../../data/ROUTES.json';
import useAuth from '../../hooks/useAuth';

function Menu() {
    const navigate = useNavigate();
    const { isAuth, logoutAction } = useAuth();
    const { authRoutes, publicRoutes, classList } = data;

    const routes = isAuth ? authRoutes : publicRoutes;

    return (
        <nav className="nav-menu">
            <ul>
                {
                    routes.map((route, index) => {
                        return (
                            <li key={index}>
                                <NavLink className={classList} to={route.to} >
                                    {route.name}
                                </NavLink>
                            </li>
                        )
                    })
                }
                {isAuth &&
                    <li>
                        <a className="nav-link" onClick={() => {
                            logoutAction();
                            navigate('/login');
                        }}>
                            Logout
                        </a>
                    </li>
                }
            </ul>
        </nav>
    );
}

export default Menu;
