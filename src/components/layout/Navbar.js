import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import toggleClass from '../utilities/toggleClass';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
import SearchBtn from './navbtn/SearchBtn';
import MailBtn from './navbtn/MailBtn';
import AuthBtn from './navbtn/AuthBtn';
import HamburgerBtn from './navbtn/HamburgerBtn';
import SearchCatalog from '../views/SearchCatalog';
// import SignupBtn from './navbar/SignupBtn';
// import SigninBtn from './navbar/SigninBtn';
import ShoppingCartBtn from './navbtn/ShoppingCartBtn';

function Navbar({ isFirefox }) {

    const { user, setUser } = useContext(UserContext)

    // Handle hamburger animation for firefox (has() css function not supported)
    const handleChange = () => {
        if (isFirefox) {
            // Add/remove 'checked class name from main header
            toggleClass(document.querySelector('.main-header'), 'checked');
        }
    }



    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" className="mobile-nav" onChange={handleChange} />
            <nav>
                <section className="left-side-nav">
                    <SearchCatalog />
                    {/************************************************* 
                     /*  SearchBtn icon mobile only @ screen < 725px 
                     /*  Has a label linked to mobile-nav checkbox 
                     *************************************************/}
                    <SearchBtn />
                    {user && (
                        <>
                            <MailBtn />
                            <ShoppingCartBtn />
                            <AuthBtn />
                        </>
                    )}
                    {/************************************************* 
                     /*  Hamburger 
                     /*  Has a label linked to mobile-nav checkbox 
                     *************************************************/}
                    <HamburgerBtn />
                </section>
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
            </nav>
        </div>
    )
}

export default Navbar;