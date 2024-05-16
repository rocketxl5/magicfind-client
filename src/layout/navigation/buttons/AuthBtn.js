import Avatar from '../../../components/Avatar.js';
import useAuth from '../../../hooks/contexthooks/useAuth.js';
import useNav from '../../../hooks/contexthooks/useNavbar.js';
import useNavButton from '../../../hooks/useNavButton.js';

const AuthBtn = () => {
    const { auth } = useAuth();
    const {displayMenu} = useNav();
    const { handleAuthMenu } = useNavButton();

    const { avatar } = auth.user;
    const content = avatar.src ?
        <img src={avatar.src} alt="Avatar" /> :
        avatar.letter
    return (
        <Avatar
            id={'auth-btn'}
            classList={'auth-btn nav-btn avatar-icon'}
            style={
                { backgroundColor: `#${avatar?.color}` }
            }
            handleClick={() => handleAuthMenu(!displayMenu)}
            content={content}
        />
    )
}

export default AuthBtn;
