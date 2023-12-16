import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SearchCatalog from '../views/search/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import { PathContext } from '../../contexts/PathContext';
import handleSearchBar from '../../utilities/handleSearchBar';

const Header = () => {
  const { pathname } = useLocation();
  const { setPathname } = useContext(PathContext);
  // Handle search bar and menu animation
  const handleClick = (e) => {
    handleSearchBar(e);
  }

  useEffect(() => {
    console.log(pathname)
    setPathname(pathname);
  }, [pathname])

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