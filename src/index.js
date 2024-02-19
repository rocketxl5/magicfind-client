import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { PathProvider } from './contexts/PathContext';
import { AuthProvider } from './contexts/AuthContext';
import { MailProvider } from './contexts/MailContext';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';
import { ScrollProvider } from './contexts/ScrollContext';
import App from './App';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/*" element={<App />} />
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <PathProvider>
        <AuthProvider>
          <MailProvider>
            <SearchProvider>
              <CartProvider>
                <ScrollProvider>
                <RouterProvider router={router} />
                </ScrollProvider>
              </CartProvider>
            </SearchProvider>
          </MailProvider>
        </AuthProvider>
    </PathProvider>
  </React.StrictMode>
);

