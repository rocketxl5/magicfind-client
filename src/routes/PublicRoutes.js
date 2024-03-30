import { Outlet } from 'react-router-dom';
// Authenticated & Unauthenticated
const PublicRoutes = () => {
    console.log('public')
    return <Outlet />
}

export default PublicRoutes
