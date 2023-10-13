import React, { useState, useEffect } from 'react';
import SearchCatalog from '../views/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import toggleClass from '../utilities/toggleClass';

const Header = () => {
  const [isFirefox, setIsFirefox] = useState(false);
  const [browserWidth, setBrowserWidth] = useState(0);
  const [action, setAction] = useState('')

  // Check if browser is firefox
  useEffect(() => {
    setIsFirefox(window.navigator.userAgent.includes('Firefox'));
    setBrowserWidth(document.body.clientWidth);
  }, []);

  // Handle search bar (@ width < 725px) and menu animation 
  const handleClick = (e) => {
    // If target is menu link (i.e mobile menu is displayed) or if target is header log
    if (e.target.classList.contains('nav-link') || e.target.classList.contains('logo-btn')) {
      // Uncheck checkbox to initiate hamburger animation (from cross to hamburger)
      document.querySelector('.mobile-nav').checked = false;
      // Hide mobile menu
      document.querySelector('.menu').style.setProperty('left', '100%');
      // Display search button (maginifier icon)
      document.querySelector('.search-btn').style.setProperty('display', 'block');
      if (isFirefox) {
        // Remove 'checked' class from main header
        toggleClass(document.querySelector('.main-header'), 'checked');
      }
    }
    // If Search button (magnifier icon)
    if (e.target.classList.contains('search-btn')) {
      // Show Search bar 
      document.querySelector('.search-catalog').style.setProperty('width', 'calc(100% - 5rem)');
      // Hide Search button
      document.querySelector('.search-btn').style.setProperty('display', 'none');
      setAction('display-search')
    }
    // If Hamburger button
    if (e.target.classList.contains('hamburger-btn')) {
      // Handle Search bar
      if (action === 'display-search') {
      // Hide Search bar
        document.querySelector('.search-catalog').style.setProperty('width', '0');
        // Show Search button icon
        document.querySelector('.search-btn').style.setProperty('display', 'block');
        // Clear Search fied
        document.querySelector('.search-field').value = '';
        // Clear action state
        setAction('');
        // Handle menu
      } else {
        // If checkbox is unchecked 
        if (!document.querySelector('.mobile-nav').checked) {
          // Show Menu
          document.querySelector('.menu').style.setProperty('left', '0');
          // Hide Search button
          if (browserWidth < 775) {

            document.querySelector('.search-btn').style.setProperty('display', 'none');
          } 
        } else {
          // Hide menu
          document.querySelector('.menu').style.setProperty('left', '100%');
          // Show menu
          if (browserWidth < 775) {

            document.querySelector('.search-btn').style.setProperty('display', 'block');
          }
        }
      }
    }
  }

  return (
    <header className="main-header" onClick={handleClick}>
      <LogoBtn />
      <SearchCatalog />
      <Navbar isFirefox={isFirefox} />
    </header>
  )
}

export default Header;