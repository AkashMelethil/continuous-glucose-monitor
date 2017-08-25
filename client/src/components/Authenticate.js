import React from 'react'
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'

import '../styles/Authenticate.css'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'


class Authenticate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoginActive: true
        }

        this.handleLinkClick = this.handleLinkClick.bind(this)
    }

    handleLinkClick() {
        this.setState({
            isLoginActive: !this.state.isLoginActive
        })
    }

    render() {
        const { match, setIsAuthenticated, isAuthenticated } = this.props
        const { isLoginActive } = this.state
        return (
            <div className="auth-container">
                <div className="auth-box">
                    <ul className="auth-links">
                        <li className={isLoginActive? "selected":""}>
                            <Link onClick={this.handleLinkClick} to={`${match.url}/login`}>Login</Link>
                        </li>
                        <li className={isLoginActive? "":"selected"}>
                            <Link onClick={this.handleLinkClick} to={`${match.url}/register`}>Register</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path={`(${match.url}|${match.url}/login)`} render={routeProps => <Login 
                            {...routeProps}
                            isAuthenticated={isAuthenticated}
                            setIsAuthenticated={setIsAuthenticated}/>}
                        />
                        <Route path={`${match.url}/register`} render={routeProps => <Register
                            {...routeProps}
                            isAuthenticated={isAuthenticated}
                            setIsAuthenticated={setIsAuthenticated}/>}
                        />
                        <Route path={`${match.url}/forgot-password`} component={ForgotPassword} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Authenticate;