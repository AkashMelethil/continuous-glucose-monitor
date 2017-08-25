import React from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'

function Register({ location, isAuthenticated, setIsAuthenticated }) {
    function handleRegistration() {
        setIsAuthenticated(true)
    }

    return (
        <div className="register-container">
            <div className="input">
                <label className="fa fa-user fa-fw" aria-hidden="true"></label>
                <input type="text" placeholder="Username" />
            </div>
            <div className="input">
                <label className="fa fa-at fa-fw" aria-hidden="true"></label>
                <input type="text" placeholder="Email address" />
            </div>
            <div className="input">
                <label className="fa fa-lock fa-fw" aria-hidden="true"></label>
                <input type="password" placeholder="Choose a password" />
            </div>
            <div className="button-container">
                <button onClick={handleRegistration} className="button">Sign up</button>
            </div>
        </div>
    );
}

export default Register