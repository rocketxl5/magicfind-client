import { useContext, useEffect } from 'react';
import Catalog from '../features/search/Catalog';
import Navbar from './navigation/Navbar';
import DashboardNav from './DashboardNav';
import Logo from './navigation/Logo';
import { ScrollContext } from '../contexts/ScrollContext';
import { api } from '../api/resources';
import useAuth from '../hooks/useAuth';
import useSearch from '../hooks/useSearch';

const MainHeader = () => {
  const { headerRef } = useContext(ScrollContext);

  const { isAuth } = useAuth();
  const { updateCatalog, setUpdateCatalog, setCatalogCardNames } = useSearch();


  // Setting catalog card names for autocomplete catalog search
  useEffect(() => {
    // If true
    if (updateCatalog) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const options = {
        method: 'GET',
        headers: headers,
      };

      fetch(`${api.serverURL}/api/cards/catalog`, options)
        .then((res) => res.json())
        .then((data) => {
          setCatalogCardNames(data);
          // Reinitialize updateCatalog to allow updates
          setUpdateCatalog(false);
        })
        .catch((error) => console.log(error));
    }
  }, [updateCatalog]);

  // Handle search bar and menu animation 
  const handleClick = (e) => {
    // handleSearchBar(e);

  }
  return (
    <header className="main-header" onClick={handleClick} ref={headerRef}>
      <div className="header-container">
        <Logo />
        <Catalog />
        <Navbar />
      </div>
      {
        isAuth &&
        <DashboardNav />
      }
    </header>
  )
}

export default MainHeader;