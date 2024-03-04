import Avatar from '../../../components/Avatar';
import useAuth from '../../../hooks/useAuth';

const AuthBtn = ({ panelRef }) => {
    const { isAuth, auth } = useAuth();
    return (
        isAuth &&
        <Avatar
            avatar={auth.user.avatar}
            handleClick={() => panelRef.current.classList.toggle('side-show')}
        />
    )
}

export default AuthBtn;
