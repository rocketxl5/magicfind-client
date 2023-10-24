import React, { useContext, useEffect } from 'react';
import SearchCatalog from '../views/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import { SearchContext } from '../../contexts/SearchContext';
import handleSearchBar from '../utilities/handleSearchBar';

const Header = () => {
  const { setSearchTerm } = useContext(SearchContext);

  // Handle search bar and menu animation
  const handleClick = (e) => {
    handleSearchBar(e, (state) => { setSearchTerm(state) });
  }

  // keydown event listener calls handleKeyDown function
  // useEffect(() => {
  //   document.querySelector('.main-header').addEventListener('click', handleClick);
  //   return () => document.querySelector('.main-header').removeEventListener('click', handleClick);
  // });

  // const handleClick = (e) => {
  //   handleSearchBar(e, (state) => { setSearchTerm(state) });
  // }

  return (
    <header className="main-header" onClick={handleClick}>
      {/* // <header className="main-header"> */}
      <LogoBtn />
      <SearchCatalog />
      <Navbar />
    </header>
  )
}

export default Header;