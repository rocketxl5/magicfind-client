import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Menu from './Menu';
import AuthMenu from './AuthMenu';
import SearchBtn from './navbtn/SearchBtn';
import MailBtn from './navbtn/MailBtn';
import AuthBtn from './navbtn/AuthBtn';
import HamburgerBtn from './navbtn/HamburgerBtn';
// import SignupBtn from './navbar/SignupBtn';
// import SigninBtn from './navbar/SigninBtn';
import ShoppingCartBtn from './navbtn/ShoppingCartBtn';
import { SearchContext } from '../../contexts/SearchContext';
import handleSearchBar from '../utilities/handleSearchBar';


function Navbar() {
    const { user, setUser } = useContext(UserContext);
    const { setSearchTerm } = useContext(SearchContext);

    // useEffect(() => {
    //     document.querySelector('.navbar').addEventListener('click', handleClick);
    //     return () => document.querySelector('.navbar').removeEventListener('click', handleClick);
    // }, []);

    // const handleClick = (e) => {
    //     handleSearchBar(e.target, (state) => { setSearchTerm(state) });
    //     console.log(e.target)
    // }

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
                            <ShoppingCartBtn />
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