import { useContext, useRef } from 'react';
import SearchCatalog from '../views/search/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import { ScrollContext } from '../../contexts/ScrollContext';
import useAuth from '../../hooks/useAuth';
import handleSearchBar from '../../assets/utilities/handleSearchBar';

const Header = () => {
  const { auth } = useAuth();
  const { navRef } = useContext(ScrollContext);

  // Handle search bar and menu animation 
  const handleClick = (e) => {
    handleSearchBar(e);
  }
  return (
    <header className="main-header" onClick={handleClick} ref={navRef}>
      <div className="top-header">
        <LogoBtn />
        <SearchCatalog />
        <Navbar auth={auth} />
      </div>
    </header>
  )
}

export default Header;