import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/contexthooks/useAuth';
import data from '../../data/ROUTES.json';
import useNav from '../../hooks/contexthooks/useNavbar';
import useNavButton from '../../hooks/useNavButton';

function Menu() {
    const { isAuth, logoutAction } = useAuth();
    const { menuRef } = useNav();
    const { handleMenu } = useNavButton();

    // Declares menus related variables
    const { authRoutes, publicRoutes, classList } = data;
    // Defines routes according to user status
    const routes = isAuth ? authRoutes : publicRoutes;

    return (
        <nav className="nav-menu">
            <ul id="nav-links" ref={menuRef} onClick={(e) => handleMenu(e)}>
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
                        <Link
                            className="nav-link"
                            to={'/login'}
                            onClick={() => { logoutAction() }}
                        >
                            Logout
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    );
}

export default Menu;
