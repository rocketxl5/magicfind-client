import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PathProvider } from './contexts/PathContext';
import { AuthProvider } from './contexts/AuthContext';
import { MailProvider } from './contexts/MailContext';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >    
      <PathProvider>
        <AuthProvider>
          <MailProvider>
            <SearchProvider>
              <CartProvider>
                    <Routes>
                      <Route path="/*" element={<App />} />
                    </Routes>
              </CartProvider>
            </SearchProvider>
          </MailProvider>
        </AuthProvider>
      </PathProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
