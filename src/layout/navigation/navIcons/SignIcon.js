import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const SignIcon = () => {
    return (
        <div id="signin-icon" className="nav-icon">
            <Link className="signin-icon" to='/login'>
                <FaUserCircle className="nav-icon" size={27} title="Login" />
            </Link>
        </div>
    )
}

export default SignIcon;
