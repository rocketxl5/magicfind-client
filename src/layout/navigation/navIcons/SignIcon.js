import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const SignIcon = () => {

    return (
        <div className="nav-icon">
            <Link id="signin-icon" className="signin-icon" to='/login' title="Login">
                <FaUserCircle className="nav-icon" size={27} />
            </Link>
        </div>
    )
}

export default SignIcon;
