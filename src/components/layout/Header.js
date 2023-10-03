import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import LogoBtn from './navbtn/LogoBtn';
import toggleClass from '../utilities/toggleClass';

const Header = () => {
  const [isFirefox, setIsFirefox] = useState(false);
  const [innerWidth, setInnerWidth] = useState(0);
  const [action, setAction] = useState('')

  // Check if browser is firefox
  useEffect(() => {
    setIsFirefox(window.navigator.userAgent.includes('Firefox'));
    // setInnerWidth(window.innerWidth);
  }, []);

  // Handle search bar and menu animation for mobile @ width < 725px
  const handleClick = (e) => {  

    // Close menu when click on nav links or logo
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
    if (e.target.classList.contains('search-btn')) {
      document.querySelector('.search-catalog').style.setProperty('width', 'calc(100% - 4rem)');
      document.querySelector('.search-field').style.setProperty('display', 'block');
      document.querySelector('.search-field').focus();
      // document.querySelector('#search-btn').style.setProperty('display', 'none');
      setAction('display-search')
    }
    if (e.target.classList.contains('hamburger-btn')) {
      if (action === 'display-search' && document.querySelector('.mobile-nav').checked) {
        document.querySelector('.search-catalog').style.setProperty('width', '0');
        document.querySelector('.search-field').style.setProperty('display', 'none');
        // document.querySelector('#search-btn').style.setProperty('display', 'block');
        setAction('');
      } else if (!document.querySelector('.mobile-nav').checked) {
        document.querySelector('.search-btn').style.setProperty('display', 'none');
        document.querySelector('.menu').style.setProperty('left', '0');
      } else {
        document.querySelector('.search-btn').style.setProperty('display', 'block');
        document.querySelector('.menu').style.setProperty('left', '100%');
      }
    }
  }

  return (
    <header className="main-header" onClick={handleClick}>
      <LogoBtn />
      <Navbar isFirefox={isFirefox} />
    </header>
  )
}

export default Header;