import SearchBtn from './buttons/SearchBtn';
import MailBtn from './buttons/MailBtn';
import Hamburger from './buttons/Hamburger';
import SignInBtn from './buttons/SignInBtn';
import AuthBtn from './buttons/AuthBtn';
import ShoppingCartBtn from './buttons/ShoppingCartBtn';
import useAuth from '../../hooks/useAuth';
import useNav from '../../hooks/useNav';
import getViewPortWidth from '../../assets/utilities/getViewPortWidth';

const Buttons = () => {
    const { isAuth, auth } = useAuth();
    const { navRef } = useNav();
    const viewport = getViewPortWidth();

    return (
        <div className="nav-btns">
            {/************************************************* 
                     /*  SearchBtn icon mobile only @ screen < 725px 
                     /*  Has a label linked to mobile-nav checkbox 
                     *************************************************/}
            {
                viewport < 775 ? (
                    <>
                        <SearchBtn />

                        {isAuth ? (
                            <MailBtn />
                        ) : (
                            <SignInBtn />
                        )}
                        <ShoppingCartBtn />
                        <Hamburger />
                    </>
                ) : (
                    <>
                        {isAuth ? (
                            <>
                                <MailBtn />
                                <ShoppingCartBtn />
                                <AuthBtn auth={auth} />
                            </>
                        ) : (
                            <>
                                <SignInBtn />
                                <ShoppingCartBtn />
                                <Hamburger />
                            </>
                        )
                        }
                    </>
                )
            }
            {/************************************************* 
                     /*  Hamburger 
                     /*  Has a label linked to mobile-nav checkbox 
                     *************************************************/}

        </div>

    )
}

export default Buttons
