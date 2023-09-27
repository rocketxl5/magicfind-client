import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Success() {
    const location = useLocation()
    return (
        <div className="container flex flex-column align-center justify-center">
            <header className="center">
                <p className="success"><i class="fas fa-check-circle check-icon"></i></p>
                <h2>{location.state ? location.state.message : 'Success!'}</h2>
            </header>
            <div className="form-element">
                <Link className="btn-small" to="/login">Sign up</Link>
                <Link className="btn-small" to="/">Home</Link>
            </div>
        </div>
    )
}

export default Success
