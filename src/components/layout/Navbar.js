import Menu from './Menu';
import AuthMenu from './AuthMenu';
import useAuth from '../../hooks/useAuth';
import SearchBtn from './navbtn/SearchBtn';
import MailBtn from './navbtn/MailBtn';
import AuthBtn from './navbtn/AuthBtn';
import HamburgerBtn from './navbtn/HamburgerBtn';
// import SignupBtn from './navbar/SignupBtn';
// import SigninBtn from './navbar/SigninBtn';
import ShoppingCartBtn from './navbtn/ShoppingCartBtn';

function Navbar() {
    const { user } = useAuth();
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
                    {user && (
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
                    {user ? (
                        <AuthMenu />
                    ) : (
                        <Menu />
                    )}
                </section>
            </nav>
        </div>
    )
}

export default Navbar;