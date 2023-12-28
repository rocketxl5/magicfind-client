import { Link } from 'react-router-dom'

const AuthModal = () => {
    return (
        <div className="auth-modal">
            <ul>
                <li><Link className="nav-link" to={'/login'}>Sing In</Link></li>
                <li><Link className="nav-link" to={'/signup'}>Sing Up</Link></li>
            </ul>
        </div>
    )
}

export default AuthModal
