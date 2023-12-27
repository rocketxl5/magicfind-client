import SearchCatalog from '../views/search/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import useAuth from '../../hooks/useAuth';
import handleSearchBar from '../../utilities/handleSearchBar';

const Header = () => {
  const { auth } = useAuth();


  // Handle search bar and menu animation
  const handleClick = (e) => {
    handleSearchBar(e);
  }
  return (
    <header className="main-header" onClick={handleClick}>
      <div className="top-header">
      <LogoBtn />
      <SearchCatalog />
        <Navbar auth={auth} />
      </div>

    </header>
  )
}

export default Header;