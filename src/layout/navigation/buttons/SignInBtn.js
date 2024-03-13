import { FaUserCircle } from 'react-icons/fa';
import useNavButton from '../../../hooks/useNavButton';

const SignInBtn = () => {
    const { navButtonHandler } = useNavButton();

    return (
        <button
            id='signin-btn'
            className='nav-btn signin-btn'
            type='button'
            title='Login'
            onClick={(e) => navButtonHandler('/login')}
        >
            <FaUserCircle />
        </button>
    )
}

export default SignInBtn