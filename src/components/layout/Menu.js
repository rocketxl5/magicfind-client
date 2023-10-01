import React from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <ul>
            <li >
                <Link className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/about">
                    About
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/contact">
                    Contact
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/login">
                    Sign In
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup">
                    Create Account
                </Link>
            </li>
        </ul>
    )
}

export default Menu
