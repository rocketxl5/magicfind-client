import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="content">
      <header className="header">

        <h2 className="title">Profile</h2>
      </header>
      <main className="main">
        <p>Name: {user.name}</p>
        <p>Country: {user.country}</p>
      </main>
    </div>
  );
};

export default Profile;
