import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import useNavbar from '../../../hooks/contexthooks/useNavbar';

const SignBtn = () => {
    const navigate = useNavigate();
    const { displayMenu, setDisplayMenu } = useNavbar();

    const handleClick = () => {
        if (displayMenu) {
            setDisplayMenu(false);
        }
        navigate('/login');
    }

    return (
        <button
            id='sigin-btn'
            className='nav-btn search-btn'
            type='button'
            title='Login'
            onClick={handleClick}
        >
            <FaUserCircle className="nav-btn" size={27} />
        </button>
    )
}

export default SignBtn;
{/* <Link id="signin-icon" className="signin-icon" to='/login' title="Login"> */ }