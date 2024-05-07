import { useEffect } from 'react';
import Navbar from './navigation/Navbar';
import SearchForm from '../features/search/SearchForm';
import DashboardNav from './DashboardNav';
import Logo from './navigation/buttons/Logo';
import { api } from '../api/resources';
import useAuth from '../hooks/contexthooks/useAuth';
import useSearch from '../hooks/contexthooks/useSearch';
import useScroll from '../hooks/contexthooks/useScroll';

const MainHeader = () => {
  const { headerRef } = useScroll();
  const { isAuth } = useAuth();
  const {
    updateCatalog,
    setUpdateCatalog,
    setUpdateCollection,
    setCatalogCardNames,
    catalogCardNames,
    catalogInputRef
  } = useSearch();

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
          setUpdateCollection(true);
          // Reinitialize updateCatalog to allow updates
          setUpdateCatalog(false);
        })
        .catch((error) => console.log(error));
    }
  }, [updateCatalog]);

  return (
    <header className="main-header" ref={headerRef}>
      <div className="header-container">
        <Logo />
        <SearchForm
          type={'catalog'}
          classList={'search-catalog-input'}
          pathname={'/catalog'}
          placeholder={'Search Magic Find'}
          cardNames={catalogCardNames}
          inputRef={catalogInputRef}
        />
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