import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/contexthooks/useAuth';
import data from '../../data/ROUTES.json';
import useNav from '../../hooks/contexthooks/useNav';

// Dynamic navigation menues for public and authenticated users
function Menu({ handleClick }) {

    const navigate = useNavigate();
    const { isAuth, logoutAction } = useAuth();
    const { menuRef } = useNav();
    // Declares menus related variables
    const { authRoutes, publicRoutes, classList } = data;
    // Defines routes according to user status
    const routes = isAuth ? authRoutes : publicRoutes;

    // const handleClick = () => {
    //     // Close Menu
    //     setDisplayMenu(!displayMenu);
    //     // Check mobile-nav checkbox to trigger css hamburger animation
    //     checkboxRef.current?.click();
    // }

    return (
        <nav className="nav-menu">
            <ul id="nav-links" ref={menuRef} onClick={handleClick}>
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
