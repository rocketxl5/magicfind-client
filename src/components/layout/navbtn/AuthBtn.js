import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const AuthBtn = () => {
    return (
        <div className="nav-btn">
            <Link className="auth-btn" to='/login'>
                <FaUserCircle className="nav-icon" size={27} title="Login" />
            </Link>
        </div>
    )
}

export default AuthBtn;
