import SearchCatalog from '../views/search/SearchCatalog';
import Navbar from './Navbar';
import AuthContextualNav from './AuthContextualNav';
import LogoBtn from './navbtn/LogoBtn';
import useAuth from '../../hooks/useAuth';
import handleSearchBar from '../../utilities/handleSearchBar';

const Header = () => {
  const { auth } = useAuth();

  const views = [
    { title: 'Home', path: '../me/home' },
    { title: 'Collection', path: '../me/collection' },
    { title: 'Store', path: '../me/store' },
    { title: 'Add Card', path: '../me/add-card' },
  ];
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
      {
        auth &&
        <div className="bottom-header">
          <AuthContextualNav views={views} />
        </div>
      }
    </header>
  )
}

export default Header;