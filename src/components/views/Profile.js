import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2 className="page-title">Profile</h2>
      <div>{user.name}</div>
      <div>{user.country}</div>
    </div>
  );
};

export default Profile;
