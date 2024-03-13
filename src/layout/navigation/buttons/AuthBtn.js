import Avatar from '../../../components/Avatar.js';
import useAuth from '../../../hooks/contexthooks/useAuth.js';
import useNavButton from '../../../hooks/useNavButton.js';

const AuthBtn = () => {
    const { isAuth, auth } = useAuth();
    const { navButtonHandler } = useNavButton()

    return (
        isAuth &&
        <Avatar
            id={'auth-btn'}
            classList={'auth-btn nav-btn'}
            avatar={auth?.user.avatar}
            handleClick={(e) => navButtonHandler()}
        />
    )
}

export default AuthBtn;
