import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import toggleClass from '../utilities/toggleClass';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
import MailBtn from './navbar/MailBtn';
import SignupBtn from './navbar/SignupBtn';
import SigninBtn from './navbar/SigninBtn';
import ShoppingCartBtn from './navbar/ShoppingCartBtn';

function Navbar({ isFirefox }) {
    const [display, setDisplay] = useState(true);
    const { user, setUser } = useContext(UserContext)

    const handleChange = (e) => {
        toggleClass(document.querySelector('header'), 'checked')
    }

    const handleClick = (e) => {
        console.log(e.target)
        if (e.target.classList.contains('nav-link')) {
            document.querySelector('.mobile-nav').checked = false;
        }
    }

    return (
        <div className="navbar" onClick={handleClick}>
            <input type="checkbox" id="mobile-nav" className="mobile-nav" onChange={isFirefox && handleChange} />   
            <nav>
                <section className="left-side">
                    {user ? (
                        <AuthMenu
                            user={user}
                            setUser={setUser}
                        />
                    ) : (
                        <Menu />
                    )}
                </section>
                <section className="right-side">
                    {user ? (
                        <MailBtn />
                    ) : (
                        <>
                            <SigninBtn />
                            <SignupBtn />
                        </>
                    )}
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