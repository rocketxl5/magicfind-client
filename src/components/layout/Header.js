// import React, {
//   useRef,
//   Fragment,
//   useState,
//   useEffect,
//   useContext
// } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// // import NavMobile from './NavMobile';
// // import Nav from './Nav';
// import Navbar from './Navbar'
// import SearchCatalog from '../views/SearchCatalog';
// import { FiMail } from 'react-icons/fi';
// import { FiShoppingCart } from 'react-icons/fi';
// import { FiSearch } from 'react-icons/fi';
// import { UserContext } from '../../contexts/UserContext';
// import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
// import styled from 'styled-components';

// const Header = () => {
//   const location = useLocation();
//   const navCheckBox = useRef(null);
//   const searchCheckbox = useRef(null);
//   const { user, unreadMail } = useContext(UserContext);
//   const { itemsCount } = useContext(ShoppingCartContext);
//   const [innerWidth, setInnerWidth] = useState(window.innerWidth);

//   const handleChange = (e) => {
//     if (e.target.checked && navCheckBox.current.checked) {
//       navCheckBox.current.checked = false;
//     }
//   };

//   useEffect(() => {
//     if (innerWidth < 1200) {
//       navCheckBox.current.checked = false;
//       searchCheckbox.current.checked = false;
//     }
//   }, [location]);

//   const changeInnerWidth = () => {
//     if (setInnerWidth) setInnerWidth(window.innerWidth);
//   };

//   useEffect(() => {
//     window.addEventListener('resize', changeInnerWidth);
//     return () => {
//       window.removeEventListener('resize', changeInnerWidth);
//     };
//   });

//   return (
//     <Fragment>
//       {innerWidth < 1200 ? (
//         <header className="header-mobile">
//           <div className="section--logo">
//             <h1 className="logo">
//               <Link to="/">Magic Find</Link>
//             </h1>
//           </div>
//           <NavMobile
//             navCheckBox={navCheckBox}
//             searchCheckbox={searchCheckbox}
//             innerWidth={innerWidth}
//           />
//           <div className="section-mobile-icons">
//             {user && (
//               <Mail className="section--mail padding-right">
//                 <Link to="/mail/inbox" title="Mailbox">
//                   {unreadMail > 0 && (
//                     <UnreadContainer>
//                       <Unread>{unreadMail}</Unread>
//                     </UnreadContainer>
//                   )}
//                   <FiMail className="header--icon" size={27} />
//                 </Link>
//               </Mail>
//             )}

//             <div className="section--search padding-right">
//               <input
//                 type="checkbox"
//                 id="search-toggle"
//                 className="search-toggle"
//                 ref={searchCheckbox}
//                 onChange={(e) => {
//                   handleChange(e);
//                 }}
//               />
//               <label htmlFor="search-toggle" className="search-toggle-label">
//                 <FiSearch
//                   className="header--icon"
//                   size={27}
//                   title="Search Catalog"
//                 />
//               </label>
//               <div className="section searchbar">
//                 <SearchCatalog className="section searchbar" />
//               </div>
//             </div>

//             <Cart className="section--cart">
//               <Link to="/cart">
//                 {itemsCount > 0 && (
//                   <CountContainer>
//                     <Count>{itemsCount}</Count>
//                   </CountContainer>
//                 )}
//                 <FiShoppingCart size={27} title="Shopping Cart" />
//               </Link>
//             </Cart>
//           </div>
//         </header>
//       ) : (
//         <header className="header">
//           <Nav innerWidth={innerWidth} />
//         </header>
//       )}
//     </Fragment>
//   );
// };

// const CountContainer = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: -10px;
//   left: 17px;
//   background: #dc3545;
//   width: 22px;
//   height: 22px;
//   border-radius: 50%;
//   z-index: 10;
// `;

// const Count = styled.div`
//   text-align: center;
//   font-size: 0.8em;
//   font-weight: bold;
//   color: #fff;
// `;

// const Cart = styled.div`
//   position: relative;
// `;
// const Mail = styled.div`
//   position: relative;
// `;
// const UnreadContainer = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   top: -10px;
//   left: 17px;
//   background-color: #28a745;
//   width: 22px;
//   height: 22px;
//   border-radius: 50%;
//   z-index: 10;
// `;
// const Unread = styled.div`
//   text-align: center;
//   font-size: 0.8em;
//   font-weight: bold;
//   color: #fff;
// `;

// export default Header;
import React, { useState, useEffect } from 'react';
import SearchCatalog from '../views/SearchCatalog';
import Navbar from './Navbar';
import LogoBtn from './navbar/LogoBtn';
import toggleClass from '../utilities/toggleClass';

const Header = () => {
  const [isFirefox, setIsFirefox] = useState(false);
  const [action, setAction] = useState('')

  // Check if browser is firefox
  useEffect(() => {
    setIsFirefox(window.navigator.userAgent.includes('Firefox'));
  }, []);

  // Handle search bar and menu animation for mobile @ width < 725px
  const handleClick = (e) => {
    console.log(e.target)
    // Close menu when click on nav links or logo
    if (e.target.classList.contains('nav-link') || e.target.classList.contains('logo-btn')) {
      // Uncheck checkbox to close mobile menu
      document.querySelector('.mobile-nav').checked = false;
      document.querySelector('.menu').style.setProperty('left', '100%');
      document.querySelector('#search-btn').style.setProperty('display', 'block');
      if (isFirefox) {
        // Remove 'checked' class from main header
        toggleClass(document.querySelector('.main-header'), 'checked');
      }
    }
    if (e.target.classList.contains('search-btn')) {
      document.querySelector('.search-catalog').style.setProperty('width', 'calc(100% - 4rem)');
      document.querySelector('.search-field').style.setProperty('display', 'block');
      document.querySelector('#search-btn').style.setProperty('display', 'none');
      setAction('display-search')
    }
    if (e.target.classList.contains('hamburger-btn')) {
      if (action === 'display-search' && document.querySelector('.mobile-nav').checked) {
        document.querySelector('.search-catalog').style.setProperty('width', '0');
        document.querySelector('.search-field').style.setProperty('display', 'none');
        document.querySelector('#search-btn').style.setProperty('display', 'block');
        setAction('');
      } else if (!document.querySelector('.mobile-nav').checked) {
        document.querySelector('#search-btn').style.setProperty('display', 'none');
        document.querySelector('.menu').style.setProperty('left', '0');
      } else {
        document.querySelector('#search-btn').style.setProperty('display', 'block');
        document.querySelector('.menu').style.setProperty('left', '100%');
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