import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { auth } = useAuth();

  return (
    <main className="page profile">
      <header className="header">

        <h2 className="title">Profile</h2>
      </header>
      <main className="main">
        <p>Name: {auth.name}</p>
        <p>Country: {auth.country}</p>
      </main>
    </main>
  );
};

export default Profile;
