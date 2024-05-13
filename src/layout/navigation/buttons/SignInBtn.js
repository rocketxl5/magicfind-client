import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const SignInBtn = () => {
    const navigate = useNavigate();

    return (
        <button
            id='signin-btn'
            className='nav-btn signin-btn'
            type='button'
            title='Login'
            onClick={() => navigate('/login')}
        >
            <FaUserCircle />
        </button>
    )
}

export default SignInBtn