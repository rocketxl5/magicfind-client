import Avatar from '../../../components/Avatar';
import useAuth from '../../../hooks/contexthooks/useAuth';
import useNavbar from '../../../hooks/contexthooks/useNavbar.js';

const AuthIcon = () => {
    const { isAuth, auth } = useAuth();
    const { displayMenu, setDisplayMenu } = useNavbar();

    return (
        isAuth &&
        <Avatar id={'auth-icon'} classList={'nav-icon'} avatar={auth?.user.avatar} handleClick={() => setDisplayMenu(!displayMenu)} />
    )
}

export default AuthIcon;
