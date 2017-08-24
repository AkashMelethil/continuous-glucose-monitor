import React from 'react'
import { Link } from 'react-router-dom'


function Login() {
    return (
        <div className="login-container">
            Login
            <Link to="/auth/forgot-password">Forgot Password</Link>
        </div>
    );
}

export default Login