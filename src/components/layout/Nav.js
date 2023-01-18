import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchCatalog from '../views/SearchCatalog';
import AuthMenu from './AuthMenu';
import { FiChevronDown } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';
import { UserContext } from '../../contexts/UserContext';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import styled from 'styled-components';

const Navbar = ({ innerWidth }) => {
  const [display, setDisplay] = useState(false);
  const { user, setUser, unreadMail } = useContext(UserContext);
  const { itemsCount } = useContext(ShoppingCartContext);

  return (
    <Nav>
      <Logo>
        <Title>
          <Link to="/">Magic Find</Link>
        </Title>
      </Logo>
      <SearchInput>
        <SearchCatalog />
      </SearchInput>
      <Auth>
        <Elements>
          {user && (
            <Mail>
              <Link to="/mail/inbox" title="Mailbox">
                {unreadMail > 0 && (
                  <UnreadContainer>
                    <Unread>{unreadMail}</Unread>
                  </UnreadContainer>
                )}
                <FiMail size={27} />
              </Link>
            </Mail>
          )}
          {!user ? (
            <Buttons>
              <Link to="/login">
                <Login>Login</Login>
              </Link>
              <Link to="/register">
                <Register>Register</Register>
              </Link>
            </Buttons>
          ) : (
            <DropDown className="auth-dropdown">
              <div
                className="auth-name"
                onMouseEnter={() => setDisplay(true)}
                onMouseLeave={() => setDisplay(false)}
              >
                Welcome {user.name}
                <FiChevronDown size={25} />
              </div>
              {display ? (
                <ul
                  className="auth-dropdown-content"
                  onMouseEnter={(e) => setDisplay(true)}
                  onMouseLeave={(e) => setDisplay(false)}
                >
                  <AuthMenu
                    setDisplay={setDisplay}
                    setUser={setUser}
                    innerWidth={innerWidth}
                  />
                </ul>
              ) : (
                ''
              )}
            </DropDown>
          )}
          <Cart to="/cart">
            <Link to="/cart">
              {itemsCount > 0 && (
                <CountContainer>
                  <Count>{itemsCount}</Count>
                </CountContainer>
              )}
              <FiShoppingCart size={30} title="Shopping Cart" />
            </Link>
          </Cart>
        </Elements>
      </Auth>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  width: 33%;
`;

const Title = styled.h1`
  a {
    font-size: 1.4em;
    color: #dc3545;
  }
`;

const SearchInput = styled.div`
  width: 34%;
`;

const Auth = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
`;

const Elements = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  a button {
    width: 7em;
    margin-right: 1em;
    padding: 0.6em 0;
    color: #fff;
    font-size: 1rem;
    border: none;
  }
`;

const Login = styled.button`
  background-color: #28a745;
`;

const Register = styled.button`
  background-color: #007bff;
`;

const DropDown = styled.div``;

const Cart = styled(Link)`
  position: relative;
  display: flex;
  text-align: center;

  a svg {
    display: block;
    color: #fff;
  }
`;

const CountContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 17px;
  background: #dc3545;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  z-index: 10;
`;

const Count = styled.div`
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  color: #fff;
`;

const Mail = styled.div`
  position: relative;
  display: flex;

  a svg {
    display: block;
    color: #fff;
  }
`;

const UnreadContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 17px;
  background-color: #28a745;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  z-index: 10;
`;

const Unread = styled.div`
  text-align: center;
  font-size: 0.8em;
  font-weight: bold;
  color: #fff;
`;

export default Navbar;
