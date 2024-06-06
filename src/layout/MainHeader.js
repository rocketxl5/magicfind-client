import { useEffect } from 'react';
import Navbar from './navigation/Navbar';
import SearchForm from '../features/search/SearchForm';
import DashboardNav from './DashboardNav';
import Logo from './navigation/buttons/Logo';
import { api } from '../api/resources';
import useFetch from '../hooks/useFetch';
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
    catalogInputRef,

  } = useSearch();

  const { fetch, error, response } = useFetch();

  // Fetch response handler
  useEffect(() => {
    // Response from query catalog product names
    if (response && updateCatalog) {
      // Update state with response
      setCatalogCardNames(response);
      // Auth user
      if (isAuth) {
        // Change state to trigger collection update
        setUpdateCollection(true);
      }
      // Reinitialize updateCatalog to allow updates
      setUpdateCatalog(false);
    }
  }, [response])

  useEffect(() => {
    if (updateCatalog) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const url = `${api.serverURL}/api/catalog/product/names`;
      fetch(url, config);
    }
  }, [updateCatalog])

  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  return (
    <header className="main-header" ref={headerRef}>
      <div className="header-container">
        <Logo />
        <SearchForm
          type={'catalog'}
          classList={'search-catalog-input'}
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