import Avatar from '../../../components/Avatar.js';
import useAuth from '../../../hooks/contexthooks/useAuth.js';
import useNavbar from '../../../hooks/contexthooks/useNavbar.js';

const AuthBtn = () => {
    const { isAuth, auth } = useAuth();
    const { displayMenu, setDisplayMenu } = useNavbar();

    return (
        isAuth &&
        <Avatar
            id={'auth-icon'}
            classList={'nav-btn'}
            avatar={auth?.user.avatar}
            handleClick={() => setDisplayMenu(!displayMenu)}
        />
    )
}

export default AuthBtn;
