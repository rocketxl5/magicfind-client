import Avatar from '../../../components/Avatar';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useMenu from '../../../hooks/contexthooks/useMenu';

const AuthIcon = () => {
    const { isAuth, auth } = useAuth();
    const { displayMenu, setDisplayMenu } = useMenu();

    return (
        isAuth &&
        <Avatar id={'auth-icon'} classList={'nav-icon'} avatar={auth?.user.avatar} handleClick={() => setDisplayMenu(!displayMenu)} />
    )
}

export default AuthIcon;
