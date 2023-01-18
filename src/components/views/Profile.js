import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <div>
      <h2 className="page-title">Profile</h2>
      <div>{user.name}</div>
      <div>{user.country}</div>
    </div>
  );
};

export default Profile;
