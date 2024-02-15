import { useContext, useRef } from 'react';
import Catalog from '../views/search/Catalog';
import Navbar from './Navbar';
import AuthContextualNav from './AuthContextualNav';
import LogoBtn from './navbtn/LogoBtn';
import { ScrollContext } from '../../contexts/ScrollContext';
import useAuth from '../../hooks/useAuth';
import handleSearchBar from '../../assets/utilities/handleSearchBar';

const MainHeader = () => {
  const { navRef } = useContext(ScrollContext);
  const { isAuth } = useAuth();

  const views = [
    { title: 'Dashboard', id: 'dashboard' },
    { title: 'Collection', id: 'collection' },
    { title: 'Store', id: 'store' },
    { title: 'Archive', id: 'archive' },
  ]

  // Handle search bar and menu animation 
  const handleClick = (e) => {
    handleSearchBar(e);
  }
  return (
    <header className="main-header" onClick={handleClick} ref={navRef}>
      <div className="top-header">
        <LogoBtn />
        <Catalog />
        <Navbar />
      </div>
      {
        isAuth &&
        <AuthContextualNav views={views} />
      }
    </header>
  )
}

export default MainHeader;