import SearchIcon from './navIcons/SearchIcon';
import MailIcon from './navIcons/MailIcon';
import Hamburger from './Hamburger';
import SignIcon from './navIcons/SignIcon';
import AuthIcon from './navIcons/AuthIcon';
import CartIcon from './navIcons/CartIcon';
import useNav from '../../hooks/contexthooks/useNav.js';
import useAuth from '../../hooks/contexthooks/useAuth';
import useViewport from '../../hooks/contexthooks/useViewport';

const NavIcons = () => {
    const { isAuth, auth } = useAuth();
    const { isMobile } = useViewport();

    return (
        <div className="nav-icons" >
            {/* <div className="nav-icons" onClick={(e) => handleMenu(e)}> */}
            {/************************************************* 
             /*  Hamburger
             /*  Has a label linked to mobile-nav checkbox
             *********** **************************************/}
            {/*************************************************
             /*  SearchIcon icon mobile only @ screen < 725px
             /*  Has a label linked to mobile-nav checkbox
              *************************************************/}
            {/* Mobile & Desktop [public & authenticated]*/}
            {
                isMobile ? (
                    <>
                        <SearchIcon />
                        {isAuth ? (
                            <MailIcon />
                        ) : (
                            <SignIcon />
                        )}
                        <CartIcon />
                        <Hamburger />
                    </>
                ) : (
                    <>
                        {isAuth ? (
                            <>
                                <MailIcon />
                                <CartIcon />
                                <AuthIcon auth={auth} />
                            </>
                        ) : (
                            <>
                                <SignIcon />
                                <CartIcon />
                                <Hamburger />
                            </>
                        )
                        }
                    </>
                )
            }
        </div>
    )
}

export default NavIcons;
