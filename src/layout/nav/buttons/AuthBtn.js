import Avatar from '../../../components/Avatar';
import useAuth from '../../../hooks/useAuth';

const AuthBtn = ({ panelRef }) => {
    const { isAuth, auth } = useAuth();
    return (
        isAuth &&
        <label htmlFor="mobile-nav" className="">
            <Avatar avatar={auth.user.avatar} />
        </label>
    )
}

export default AuthBtn;
