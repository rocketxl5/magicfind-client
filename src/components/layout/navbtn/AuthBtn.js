import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const AuthBtn = () => {
    return (
        <div className="nav-btn auth-btn">
            <FaUserCircle className="nav-icon" size={27} />
        </div>
    )
}

export default AuthBtn;
