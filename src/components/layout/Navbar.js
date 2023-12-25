import Menu from './Menu';
import AuthMenu from './AuthMenu';
import useAuth from '../../hooks/useAuth';
import SearchBtn from './navbtn/SearchBtn';
import MailBtn from './navbtn/MailBtn';
import AuthBtn from './navbtn/AuthBtn';
import HamburgerBtn from './navbtn/HamburgerBtn';
import ShoppingCartBtn from './navbtn/ShoppingCartBtn';

function Navbar() {
    const { auth } = useAuth();

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
                    {auth && (
                        <>
                            <MailBtn />
                        </>
                    )}
                    {/************************************************* 
                     /*  Hamburger 
                     /*  Has a label linked to mobile-nav checkbox 
                     *************************************************/}
                    <ShoppingCartBtn />
                    <HamburgerBtn />
                </section>
                <section className="right-side-nav">
                    {auth ? (
                        <AuthMenu authPaths={authPaths} />
                    ) : (
                            <Menu paths={paths} />
                    )}
                </section>
            </nav>
        </div>
    )
}

export default Navbar;