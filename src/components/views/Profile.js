import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <div className="container">
      <h2 className="page-title">Profile</h2>
      <div>{user.name}</div>
      <div>{user.country}</div>
    </div>
  );
};

export default Profile;
