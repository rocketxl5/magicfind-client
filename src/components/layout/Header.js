import React, { useContext, useState, useEffect } from 'react';
import SearchBar from '../views/SearchBar';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import toggleClass from '../utilities/toggleClass';
import { SearchContext } from '../../contexts/SearchContext';

const Header = () => {
  const [isFirefox, setIsFirefox] = useState(false);
  const [action, setAction] = useState('');
  const { setsearchTerm } = useContext(SearchContext);

  // Check if browser is firefox
  useEffect(() => {
    setIsFirefox(window.navigator.userAgent.includes('Firefox'));
  }, []);

  // Handle search bar and menu animation for mobile @ width < 725px
  const handleClick = (e) => {

    // If 
    if (e.target.classList.contains('nav-link') || e.target.classList.contains('logo-btn')) {
      // Uncheck checkbox to close mobile menu
      document.querySelector('.mobile-nav').checked = false;
      document.querySelector('.menu').style.setProperty('left', '100%');
      document.querySelector('.search-btn').style.setProperty('display', 'block');
      if (isFirefox) {
        // Remove 'checked' class from main header
        toggleClass(document.querySelector('.main-header'), 'checked');
      }
    }
    // If Search button (magnifier icon)
    if (e.target.classList.contains('search-btn')) {
      // Show Search bar 
      document.querySelector('.search-bar').style.setProperty('width', 'calc(100% - 5rem)');
      // Add focus on input field
      document.querySelector('.search-field').focus();
      // Hide Search button
      document.querySelector('.search-btn').style.setProperty('display', 'none');
      setAction('display-search')
    }
    // If Hamburger button
    if (e.target.classList.contains('hamburger-btn')) {
      // Handle Search bar
      if (action === 'display-search') {
        // Hide Search bar
        document.querySelector('.search-bar').style.setProperty('width', '0');
        // Clear input field
        document.querySelector('.search-field').value = '';
        console.log(document.querySelector('.search-field').value = '')
        // Show Search button icon
        document.querySelector('.search-btn').style.setProperty('display', 'block');
        // Clear Search field
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
          document.querySelector('.search-btn').style.setProperty('display', 'none');
        } else {
          // Hide menu
          document.querySelector('.menu').style.setProperty('left', '100%');
          // Show menu
          document.querySelector('.search-btn').style.setProperty('display', 'block');
        }
      }
    }
  }

  return (
    <header className="main-header" onClick={handleClick}>
      <LogoBtn />
      <SearchBar />
      <Navbar isFirefox={isFirefox} />
    </header>
  )
}

export default Header;