import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteProvider } from './contexts/RouteContext';
import { PathProvider } from './contexts/PathContext';
import { UserProvider } from './contexts/AuthContext';
import { MailProvider } from './contexts/MailContext';
import { SearchProvider } from './contexts/SearchContext';
import { CardProvider } from './contexts/CardContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>    
    <RouteProvider>
      <PathProvider>
        <UserProvider>
          <MailProvider>
            <SearchProvider>
              <CardProvider>
                <ShoppingCartProvider>
                    <Routes>
                      <Route path="/*" element={<App />} />
                    </Routes>
                </ShoppingCartProvider>
              </CardProvider>
            </SearchProvider>
          </MailProvider>
        </UserProvider>
      </PathProvider>
    </RouteProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
