import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { MailProvider } from './contexts/MailContext';
import { NavProvider } from './contexts/NavContext';
import { ModalProvider } from './contexts/ModalContext';
import { PathProvider } from './contexts/PathContext';
import { ScrollProvider } from './contexts/ScrollContext';
import { SearchProvider } from './contexts/SearchContext';
import { ViewportProvider } from './contexts/ViewportContext';
import { IconProvider } from './contexts/IconContext';

import App from './App';

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/*" element={<App />} />
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <ViewportProvider>
      <PathProvider>
        <AuthProvider>
          <SearchProvider>
            <IconProvider>
              <NavProvider>
                <MailProvider>
                  <CartProvider>
                    <ScrollProvider>
                      <ModalProvider>
                        <RouterProvider router={router} />
                      </ModalProvider>
                    </ScrollProvider>
                  </CartProvider>
                </MailProvider>
              </NavProvider>
            </IconProvider>
          </SearchProvider>
        </AuthProvider>
      </PathProvider>
    </ViewportProvider>
  </StrictMode>
);

