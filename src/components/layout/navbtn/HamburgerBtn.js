import React, { useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';
import handleSearchBar from '../../utilities/handleSearchBar';

const HamburgerBtn = () => {
    // const { setSearchTerm } = useContext(SearchContext);
    // //   Handle search bar and menu animation
    // const handleClick = (e) => {
    //     handleSearchBar(e.target, (state) => { setSearchTerm(state) });
    // }
    return (
        <div className="hamburger  nav-btn">
            <label htmlFor="mobile-nav" className="hamburger-btn mobile-nav-label">
            <span></span>
        </label>
        </div>

    )
}

export default HamburgerBtn;
