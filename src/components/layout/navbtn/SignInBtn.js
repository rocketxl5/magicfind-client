import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const SignInBtn = () => {
    return (
        <div className="nav-btn signin-nav-btn">
            <Link className="signin-btn" to='/login'>
                <FaUserCircle className="nav-icon" size={27} title="Login" />
            </Link>
        </div>
    )
}

export default SignInBtn;
