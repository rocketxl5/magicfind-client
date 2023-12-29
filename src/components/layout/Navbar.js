import { useRef } from 'react';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
import SearchBtn from './navbtn/SearchBtn';
import MailBtn from './navbtn/MailBtn';
import HamburgerBtn from './navbtn/HamburgerBtn';
import SignInBtn from './navbtn/SignInBtn';
import AuthBtn from './navbtn/AuthBtn';
import SidePanel from '../layout/SidePanel'
import ShoppingCartBtn from './navbtn/ShoppingCartBtn';

function Navbar({ auth }) {
    const panelRef = useRef(null);

    const authPaths = [
        {
            name: 'Dashboard',
            to: '../me/dashboard',
        },
        {
            name: 'Collection',
            to: '../me/collection'
        },
        {
            name: 'Store',
            to: '../me/store'
        },
        {
            name: 'Profile',
            to: 'profile'
        },
        {
            name: 'Settings',
            to: 'settings'
        },
    ]

    const paths = [
        {
            name: 'Home',
            to: '/'
        },
        {
            name: 'About',
            to: 'about'
        },
        {
            name: 'Contact',
            to: 'contact'
        },
        {
            name: 'Sing in',
            to: 'login'
        },
        {
            name: 'Crate Account',
            to: 'signup'
        },

    ]
    return (
        <div className="navbar">
            <input type="checkbox" id="mobile-nav" className="mobile-nav" />
            <nav>
                <section className="left-side-nav">
                    {/************************************************* 
                     /*  SearchBtn icon mobile only @ screen < 725px 
                     /*  Has a label linked to mobile-nav checkbox 
                     *************************************************/}
                    <SearchBtn />
                    {auth ? (
                        <>
                            <MailBtn />
                            <ShoppingCartBtn />
                            <HamburgerBtn />
                            <AuthBtn auth={auth} panelRef={panelRef} />
                        </>
                    ) : (
                        <>
                            <ShoppingCartBtn />
                                <SignInBtn />
                            <HamburgerBtn />
                        </>
                    )}
                    {/************************************************* 
                     /*  Hamburger 
                     /*  Has a label linked to mobile-nav checkbox 
                     *************************************************/}

                </section>
                <section className="right-side-nav">
                    {auth ? (
                        <AuthMenu authPaths={authPaths} />
                    ) : (
                            <Menu paths={paths} />
                    )}
                </section>
                <SidePanel ref={panelRef}>
                    <AuthMenu authPaths={authPaths} />
                </SidePanel>
            </nav>
        </div>
    )
}

export default Navbar;