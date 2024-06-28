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
import { FeatureProvider } from './contexts/FeatureContext';
import { IconProvider } from './contexts/IconContext';
import { MailProvider } from './contexts/MailContext';
import { ModalProvider } from './contexts/ModalContext';
import { NavProvider } from './contexts/NavContext';
import { PathProvider } from './contexts/PathContext';
import { ScrollProvider } from './contexts/ScrollContext';
import { SearchProvider } from './contexts/SearchContext';
import { ViewportProvider } from './contexts/ViewportContext';

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
            <ModalProvider>
              <FeatureProvider>
                <IconProvider>
                  <NavProvider>
                    <MailProvider>
                      <CartProvider>
                        <ScrollProvider>
                          <RouterProvider router={router} />
                        </ScrollProvider>
                      </CartProvider>
                    </MailProvider>
                  </NavProvider>
                </IconProvider>
              </FeatureProvider>
            </ModalProvider>
          </SearchProvider>
        </AuthProvider>
      </PathProvider>
    </ViewportProvider>
  </StrictMode>
);

