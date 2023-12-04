import { useLocation, Navigate, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthLayout = (props) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(location)
    console.log(auth)
    if (!auth) {
        return <Route {...props} />
    }

    return <Navigate to="/" />
}

export default AuthLayout
