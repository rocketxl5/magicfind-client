import React from 'react'
import { Link } from 'react-router-dom';

const Menu = ({ paths }) => {
    return (
        <ul className='menu main-menu'>
            {
                paths.map((path, index) => {
                    return (
                        <li key={index}>
                            <Link className="nav-link" to={path.to} replace>
                                {path.name}
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Menu
