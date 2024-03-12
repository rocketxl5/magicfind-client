import { FaUserCircle } from 'react-icons/fa';
import useNavbar from '../../../hooks/contexthooks/useNavbar';
import useHamburger from '../../../hooks/useHamburger';

const SignBtn = () => {
    const { hamburgerRef } = useNavbar();

    const { resetHamburger } = useHamburger(hamburgerRef);

    return (
        <button
            id='sigin-btn'
            className='nav-btn sign-btn'
            type='button'
            title='Login'
            onClick={() => resetHamburger('/login')}
        >
            <FaUserCircle />
        </button>
    )
}

export default SignBtn