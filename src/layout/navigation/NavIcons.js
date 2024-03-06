import SearchIcon from './navIcons/SearchIcon';
import MailIcon from './navIcons/MailIcon';
import Hamburger from './Hamburger';
import SignIcon from './navIcons/SignIcon';
import AuthIcon from './navIcons/AuthIcon';
import CartIcon from './navIcons/CartIcon';
import useAuth from '../../hooks/useAuth';
import getViewPortWidth from '../../assets/utilities/getViewPortWidth';

const NavIcons = () => {
    const { isAuth, auth } = useAuth();
    const viewport = getViewPortWidth();

    return (
        <div className="nav-icons">
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
                viewport < 775 ? (
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
