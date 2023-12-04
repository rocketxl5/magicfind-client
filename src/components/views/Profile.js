import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { auth } = useAuth();

  return (
    <div className="content">
      <header className="header">

        <h2 className="title">Profile</h2>
      </header>
      <main className="main">
        <p>Name: {auth.name}</p>
        <p>Country: {auth.country}</p>
      </main>
    </div>
  );
};

export default Profile;
