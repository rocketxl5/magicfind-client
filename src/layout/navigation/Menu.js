import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/contexthooks/useAuth';
import useMenu from '../../hooks/contexthooks/useMenu';
import data from '../../data/ROUTES.json';

// Dynamic navigation menues for public and authenticated users
function Menu() {
    const navigate = useNavigate();
    const { isAuth, logoutAction } = useAuth();
    const { navRef } = useMenu();
    // Declares menus related variables
    const { authRoutes, publicRoutes, classList } = data;
    // Defines routes according to user status
    const routes = isAuth ? authRoutes : publicRoutes;

    return (
        <nav className="nav-menu">
            <ul ref={navRef}>
                {
                    // Generates menus list of links
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
                {/* Adds logout list item if authenticated users */}
                {isAuth &&
                    <li>
                        <div className="nav-link" onClick={() => {
                            logoutAction();
                            navigate('/login');
                        }}>
                            Logout
                        </div>
                    </li>
                }
            </ul>
        </nav>
    );
}

export default Menu;
