import React from 'react'
import {
    Link,
    Redirect
} from 'react-router-dom'


function Login({ location, isAuthenticated, setIsAuthenticated }) {
    function handleLogin() {
        setIsAuthenticated(true)
    }

    return isAuthenticated? (<Redirect to={{ pathname: "/", state: { from: location } }}/>)
    :
    (
        <div className="login-container">
            <div className="input">
                <label className="fa fa-at fa-fw" aria-hidden="true"></label>
                <input type="text" placeholder="Email address" />
            </div>
            <div className="input">
                <label className="fa fa-lock fa-fw" aria-hidden="true"></label>
                <input type="password" placeholder="Choose a password" />
            </div>
            <div className="login-forgot-container">
                <Link to="/auth/forgot-password">Forgot password?</Link>
                {/*<a className="forgot-link">Forgot password?</a>*/}
            </div>
            <div className="button-container">
                <button onClick={handleLogin} className="button">Login</button>
            </div>
        </div>
    );
}

export default Login