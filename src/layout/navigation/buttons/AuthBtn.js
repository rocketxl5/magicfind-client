import Avatar from '../../../components/Avatar';
import useAuth from '../../../hooks/useAuth';
import useNav from '../../../hooks/useNav';

const AuthBtn = () => {
    const { isAuth, auth } = useAuth();
    const { isOpen, setIsOpen } = useNav();

    return (
        isAuth &&
        <Avatar avatar={auth?.user.avatar} handleClick={() => setIsOpen(!isOpen)} />
    )
}

export default AuthBtn;