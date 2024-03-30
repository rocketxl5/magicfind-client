import { Navigate, Outlet } from 'react-router-dom';

// Must be Unauthenticated
const RestrictedRoutes = () => {
    return !localStorage.getItem('auth') ? <Outlet /> : <Navigate to={'/me'} replace />
}

export default RestrictedRoutes;