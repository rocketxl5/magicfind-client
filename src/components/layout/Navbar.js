import React from 'react';
import { Link } from 'react-router-dom';
import toggleClass from '../utilities/toggleClass';
import { FiShoppingCart } from 'react-icons/fi';

function Navbar({ isFirefox }) {

    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" onChange={() => isFirefox && toggleClass(document.querySelector('header'), 'checked')} />   
            <nav>
                <section className="left-side">
                    <ul>
                        <li><Link className="nav-link" to="#"><span>Home</span></Link></li>
                        <li><Link className="nav-link" to="#"><span>Team</span></Link></li>
                        <li><Link className="nav-link" to="#"><span>About</span></Link></li>
                        <li><Link className="nav-link" to="#"><span>Contact</span></Link></li>
                        <li><Link className="nav-link" to="/signup"><span>Create account</span></Link></li>
                    </ul>
                </section>
                <section className="right-side">
                    <Link className="btn-small" to="/login">Sign in</Link>
                    <Link className="btn-small" to="/signup">Sign up</Link>
                    <Link to="/shopping-cart" >
                        <FiShoppingCart size={25} title="Shopping Cart" />
                    </Link>
                    <label htmlFor="mobile-nav" className="mobile-nav-label">
                        <span></span>
                    </label>
                </section>
            </nav>
        </div>
    )
}

export default Navbar;