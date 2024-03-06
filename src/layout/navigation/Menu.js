// Dropdown menu available after successfull singin
import { NavLink, useNavigate } from 'react-router-dom';
import data from '../../data/ROUTES.json';
import useAuth from '../../hooks/useAuth';
import useNav from '../../hooks/useNav';

function Menu() {
    const navigate = useNavigate();
    const { isAuth, logoutAction } = useAuth();
    const { navRef } = useNav();
    const { authRoutes, publicRoutes, classList } = data;

    const routes = isAuth ? authRoutes : publicRoutes;

    return (
        <nav className="nav-menu" ref={navRef}>
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
