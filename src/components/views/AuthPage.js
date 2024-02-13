import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AuthPage = () => {
  const { auth } = useAuth();

  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthPage;