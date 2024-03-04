import { Link } from 'react-router-dom';
import data from '../../data/ROUTES.json';

const Menu = () => {
    const { routes } = data;

    return (
        <ul className='menu'>
            {
                routes.map((route, index) => {
                    return (
                        <li key={index}>
                            <Link className="nav-link" to={route.to} replace>
                                {route.name}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Menu
