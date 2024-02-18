import React from 'react';
import ReactDOM from 'react-dom/client';
import { PathProvider } from './contexts/PathContext';
import { AuthProvider } from './contexts/AuthContext';
import { MailProvider } from './contexts/MailContext';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';
import { ScrollProvider } from './contexts/ScrollContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <PathProvider>
        <AuthProvider>
          <MailProvider>
            <SearchProvider>
              <CartProvider>
                <ScrollProvider>
                <App />
                </ScrollProvider>
              </CartProvider>
            </SearchProvider>
          </MailProvider>
        </AuthProvider>
    </PathProvider>
  </React.StrictMode>
);

