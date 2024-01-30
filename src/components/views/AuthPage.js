import { useParams, Outlet } from 'react-router-dom';
import AuthContextualNav from '../layout/AuthContextualNav';

const AuthPage = () => {
  const { path } = useParams()

  const views = [
    { title: 'Dashboard', id: 'dashboard', path: 'dashboard' },
    { title: 'Collection', id: 'collection', path: 'collection' },
    { title: 'Store', id: 'store', path: 'store' },
    { title: 'Add Card', id: 'add-card', path: 'add-card' },
  ]

  return (
    <>
      <section className="contextual-nav">
        <AuthContextualNav views={views} />
      </section>
      <Outlet />
    </>
  )
}

export default AuthPage;