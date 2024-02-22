import { useRef } from 'react';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
import SearchBtn from './navbtn/SearchBtn';
import MailBtn from './navbtn/MailBtn';
import HamburgerBtn from './navbtn/HamburgerBtn';
import SignInBtn from './navbtn/SignInBtn';
import AuthBtn from './navbtn/AuthBtn';
import SidePanel from '../SidePanel';
import ShoppingCartBtn from './navbtn/ShoppingCartBtn';
import useAuth from '../../hooks/useAuth';
import getViewPortWidth from '../../assets/utilities/getViewPortWidth';

function Navbar() {
    const panelRef = useRef(null);
    const { isAuth, auth } = useAuth();
    const viewport = getViewPortWidth();

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
                    {isAuth ? (
                        <>
                            <MailBtn />
                            <ShoppingCartBtn />
                            {viewport < 775 && <HamburgerBtn />}
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
                    {isAuth ? (
                        <AuthMenu />
                    ) : (
                        <Menu />
                    )}
                </section>
                <SidePanel ref={panelRef}>
                    <AuthMenu />
                </SidePanel>
            </nav>
        </div>
    )
}

export default Navbar;