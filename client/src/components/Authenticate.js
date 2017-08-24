import React from 'react'
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'


function Authenticate({ match }) {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <ul className="auth-links">
                    <li className="selected"><Link to={`${match.url}/login`}>Login</Link></li>
                    <li><Link to={`${match.url}/register`}>Register</Link></li>
                </ul>
                <Switch>
                    <Route path={`${match.url}/login`} component={Login} />
                    <Route path={`${match.url}/register`} component={Register} />
                    <Route path={`${match.url}/forgot-password`} component={ForgotPassword} />
                </Switch>
            </div>
        </div>
    );
}

export default Authenticate;