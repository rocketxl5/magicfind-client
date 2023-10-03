import React from 'react';
import { Link } from 'react-router-dom';

const SigninBtn = () => {
    return (
        <Link className="btn-small" to="/login">Sign in</Link>
    )
}

export default SigninBtn;
