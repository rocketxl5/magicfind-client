import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/contexthooks/useAuth';
import data from '../../data/ROUTES.json';
import useNavbar from '../../hooks/contexthooks/useNavbar';
import useHamburger from '../../hooks/useHamburger';

// Dynamic navigation menues for public and authenticated users
function Menu() {

    const navigate = useNavigate();
    const { isAuth, logoutAction } = useAuth();
    const { hamburgerRef, menuRef } = useNavbar();

    const { resetHamburger } = useHamburger(hamburgerRef);

    // Declares menus related variables
    const { authRoutes, publicRoutes, classList } = data;
    // Defines routes according to user status
    const routes = isAuth ? authRoutes : publicRoutes;

    return (
        <nav className="nav-menu">
            <ul id="nav-links" ref={menuRef} onClick={(e) => resetHamburger()}>
                {
                    // Generates menus list of links
                    routes.map((route, index) => {
                        return (
                            <li key={index}>
                                <NavLink className={classList} name={'nav-link'} to={route.to} >
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
