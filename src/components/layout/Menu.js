import React from 'react'
import { Link } from 'react-router-dom';

const Menu = ({ routes }) => {
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
