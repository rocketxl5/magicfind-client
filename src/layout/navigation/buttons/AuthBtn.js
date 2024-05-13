import Avatar from '../../../components/Avatar.js';
import useAuth from '../../../hooks/contexthooks/useAuth.js';
import useNav from '../../../hooks/contexthooks/useNavbar.js';
import useNavButton from '../../../hooks/useNavButton.js';

const AuthBtn = () => {
    const { isAuth, auth } = useAuth();
    const {displayMenu} = useNav();
    const { handleAuthMenu } = useNavButton();

    return (
        isAuth &&
        <Avatar
            id={'auth-btn'}
            classList={'auth-btn nav-btn'}
            avatar={auth?.user?.avatar}
            handleClick={() => handleAuthMenu(!displayMenu)}
        />
    )
}

export default AuthBtn;
