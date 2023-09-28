import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import toggleClass from '../utilities/toggleClass';
import MailBtn from './navbar/MailBtn';
import SignupBtn from './navbar/SignupBtn';
import SigninBtn from './navbar/SigninBtn';
import ShoppingCartBtn from './navbar/ShoppingCartBtn';

function Navbar({ isFirefox }) {
    const { user } = useContext(UserContext)
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
                    {user ? (<MailBtn />) : (<><SigninBtn /> <SignupBtn /></>)}
                    <ShoppingCartBtn />

                    <label htmlFor="mobile-nav" className="mobile-nav-label">
                        <span></span>
                    </label>
                </section>
            </nav>
        </div>
    )
}

export default Navbar;