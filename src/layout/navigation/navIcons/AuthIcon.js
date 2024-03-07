import Avatar from '../../../components/Avatar';
import useAuth from '../../../hooks/useAuth';
import useNav from '../../../hooks/useNav';

const AuthIcon = () => {
    const { isAuth, auth } = useAuth();
    const { displayMenu, setDisplayMenu } = useNav();

    return (
        isAuth &&
        <Avatar id={'auth-icon'} classList={'nav-icon'} avatar={auth?.user.avatar} handleClick={() => setDisplayMenu(!displayMenu)} />
    )
}

export default AuthIcon;
