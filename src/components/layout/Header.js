import React, { useContext } from 'react';
import SearchCatalog from '../views/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import { SearchContext } from '../../contexts/SearchContext';
import handleSearchBar from '../utilities/handleSearchBar';

const Header = () => {
  const { setSearchTerm } = useContext(SearchContext);

  // Handle search bar and menu animation 
  const handleClick = (e) => {
    handleSearchBar(e.target, (state) => { setSearchTerm(state) });
  }

  return (
    <header className="main-header" onClick={handleClick}>
      <LogoBtn />
      <SearchCatalog />
      <Navbar />
    </header>
  )
}

export default Header;