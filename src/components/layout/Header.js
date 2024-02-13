import { useContext, useRef } from 'react';
import SearchCatalog from '../views/search/SearchCatalog';
import Navbar from './Navbar';
import AuthContextualNav from './AuthContextualNav';
import LogoBtn from './navbtn/LogoBtn';
import { ScrollContext } from '../../contexts/ScrollContext';
import useAuth from '../../hooks/useAuth';
import handleSearchBar from '../../assets/utilities/handleSearchBar';

const Header = () => {
  const { navRef } = useContext(ScrollContext);
  const { isAuth } = useAuth();

  const views = [
    { title: 'Dashboard', id: 'dashboard' },
    { title: 'Collection', id: 'collection' },
    { title: 'Store', id: 'store' },
    { title: 'Add Card', id: 'add-card' },
  ]

  // Handle search bar and menu animation 
  const handleClick = (e) => {
    handleSearchBar(e);
  }
  return (
    <header className="main-header" onClick={handleClick} ref={navRef}>
      <div className="top-header">
        <LogoBtn />
        <SearchCatalog />
        <Navbar />
      </div>
      {
        isAuth &&
        <AuthContextualNav views={views} />
      }
    </header>
  )
}

export default Header;