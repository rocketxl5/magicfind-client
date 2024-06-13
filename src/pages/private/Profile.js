import Page from '../../components/Page';
import Avatar from '../../components/Avatar';
import useAuthContext from '../../hooks/contexthooks/useAuthContext';

const Profile = () => {
  const { auth } = useAuthContext();
  return (
    <Page name={'profile'} title={'Profile'}>
      <p>Name: {auth.user.name}</p>
      <p>Country: {auth.user.country}</p>
      <Avatar classList={'box-size-8 btn-top-right'} avatar={auth.user.avatar} />
    </Page>
  );
};

export default Profile;
