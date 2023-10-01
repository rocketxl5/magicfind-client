import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import toggleClass from '../utilities/toggleClass';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
import SearchBtn from './navbar/SearchBtn';
import MailBtn from './navbar/MailBtn';
import AuthBtn from './navbar/AuthBtn';
import SearchCatalog from '../views/SearchCatalog';
// import SignupBtn from './navbar/SignupBtn';
// import SigninBtn from './navbar/SigninBtn';
import ShoppingCartBtn from './navbar/ShoppingCartBtn';

function Navbar({ isFirefox }) {
    const [display, setDisplay] = useState(true);
    const { user, setUser } = useContext(UserContext)

    // Handle hamburger animation for firefox (has() css function not supported)
    const handleChange = () => {
        if (isFirefox) {
            // Add/remove 'checked class name from main header
            toggleClass(document.querySelector('.main-header'), 'checked');
        }
    }

    const handleClick = (e) => {
        if (e.target.classList.contains('nav-link')) {
            // Uncheck checkbox to close mobile menu
            document.querySelector('.mobile-nav').checked = false;
            if (isFirefox) {
                // Remove 'checked' class from main header
                toggleClass(document.querySelector('.main-header'), 'checked');
            }
        }
    }

    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" className="mobile-nav" onChange={handleChange} />
            <nav onClick={handleClick}>
                <section className="right-side-nav">
                    {user ? (
                        <AuthMenu
                            user={user}
                            setUser={setUser}
                        />
                    ) : (
                        <Menu />
                    )}
                </section>
                <section className="left-side-nav">
                    {user && (
                        <>
                            <MailBtn />
                            <AuthBtn />
                            <ShoppingCartBtn />
                        </>
                    )}
                    {/* Search icon mobile only @ screen < 725px */}
                    <SearchBtn />
                    <label htmlFor="mobile-nav" className="mobile-nav-label">
                        <span></span>
                    </label>
                </section>
            </nav>
        </div>
    )
}

export default Navbar;