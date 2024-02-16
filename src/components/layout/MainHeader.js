import { useContext, useEffect } from 'react';
import Catalog from '../views/search/Catalog';
import Navbar from './Navbar';
import DashboardNav from './DashboardNav';
import LogoBtn from './navbtn/LogoBtn';
import { ScrollContext } from '../../contexts/ScrollContext';
import useAuth from '../../hooks/useAuth';
import useSearch from '../../hooks/useSearch';
import { api } from '../../api/resources';
import handleSearchBar from '../../assets/utilities/handleSearchBar';

const MainHeader = () => {
  const { navRef } = useContext(ScrollContext);

  const { isAuth } = useAuth();
  const { updateCatalog, setCatalogCardNames } = useSearch();

  // Setting catalog card names for autocomplete catalog search
  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      method: 'GET',
      headers: headers,
    };

    fetch(`${api.serverURL}/api/cards/catalog`, options)
      .then((res) => res.json())
      .then((data) => {
        setCatalogCardNames(data)
      })
      .catch((error) => console.log(error));
  }, [updateCatalog])

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
        <DashboardNav />
      }
    </header>
  )
}

export default MainHeader;