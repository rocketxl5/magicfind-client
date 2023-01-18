import React from 'react';
import ReactDOM from 'react-dom';
import { RouteProvider } from './contexts/RouteContext';
import { PathProvider } from './contexts/PathContext';
import { UserProvider } from './contexts/UserContext';
import { MailProvider } from './contexts/MailContext';
import { SearchProvider } from './contexts/SearchContext';
import { CardProvider } from './contexts/CardContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RouteProvider>
      <PathProvider>
        <UserProvider>
          <MailProvider>
            <SearchProvider>
              <CardProvider>
                <ShoppingCartProvider>
                  <App />
                </ShoppingCartProvider>
              </CardProvider>
            </SearchProvider>
          </MailProvider>
        </UserProvider>
      </PathProvider>
    </RouteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
