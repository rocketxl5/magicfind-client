import SearchCatalog from '../views/search/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import handleSearchBar from '../../utilities/handleSearchBar';

const Header = () => {
  // Handle search bar and menu animation
  const handleClick = (e) => {
    handleSearchBar(e);
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