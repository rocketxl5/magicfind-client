import Page from '../components/Page';
import Avatar from '../components/Avatar';
import useAuth from '../hooks/contexthooks/useAuth';

const Profile = () => {
  const { auth } = useAuth();
  console.log(auth)
  return (
    <Page name={'profile'} title={'Profile'}>
      <p>Name: {auth.user.name}</p>
      <p>Country: {auth.user.country}</p>
      <Avatar classList={'box-size-8 drop-top-right'} avatar={auth.user.avatar} />
    </Page>
  );
};

export default Profile;
