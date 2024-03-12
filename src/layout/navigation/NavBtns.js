import SearchBtn from './buttons/SearchBtn';
import MailBtn from './buttons/MailBtn';
import Hamburger from './Hamburger';
import SignBtn from './buttons/SignBtn';
import AuthBtn from './buttons/AuthBtn';
import CartBtn from './buttons/CartBtn';
import useAuth from '../../hooks/contexthooks/useAuth';
import useViewport from '../../hooks/contexthooks/useViewport';

const NavBtns = () => {
    const { isAuth, auth } = useAuth();
    const { isMobile } = useViewport();

    return (
        <div className="nav-btns" >
            {/* <div className="nav-btns" onClick={(e) => handleMenu(e)}> */}
            {/************************************************* 
             /*  Hamburger
             /*  Has a label linked to mobile-nav checkbox
             *********** **************************************/}
            {/*************************************************
             /*  SearchBtn icon mobile only @ screen < 725px
             /*  Has a label linked to mobile-nav checkbox
              *************************************************/}
            {/* Mobile & Desktop [public & authenticated]*/}
            {
                isMobile ? (
                    <>
                        <SearchBtn />
                        {isAuth ? (
                            <MailBtn />
                        ) : (
                                <SignBtn />
                        )}
                        <CartBtn />
                        <Hamburger />
                    </>
                ) : (
                    <>
                        {isAuth ? (
                            <>
                                    <MailBtn />
                                    <CartBtn />
                                    <AuthBtn auth={auth} />
                            </>
                        ) : (
                            <>
                                        <SignBtn />
                                        <CartBtn />
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

export default NavBtns;
