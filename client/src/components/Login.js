import React from 'react'
import { graphql, gql } from 'react-apollo'
import {
    Link
} from 'react-router-dom'

import { saveUserToken } from '../utils/localStorage'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }

        this.handleLogin = this.handleLogin.bind(this)
    }

    async handleLogin() {
        const { email, password } = this.state
        try {
            const result = await this.props.signInUserMutation({
                variables: {
                    email,
                    password
                }
            })
            console.log(result)
            const { token, user } = result.data.signInUser
            saveUserToken(token)
            this.props.setIsAuthenticated({ isAuthenticated: true, userData: user })
        }
        catch (err) {
            console.error(err)
        }
    }

    render() {
        return (
            <div className="login-container">
                <div className="input">
                    <label className="fa fa-at fa-fw" aria-hidden="true"></label>
                    <input 
                        type="text" 
                        placeholder="Email address" 
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>
                <div className="input">
                    <label className="fa fa-lock fa-fw" aria-hidden="true"></label>
                    <input 
                        type="password" 
                        placeholder="Choose a password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>
                <div className="login-forgot-container">
                    <Link to="/auth/forgot-password">Forgot password?</Link>
                </div>
                <div className="button-container">
                    <button onClick={this.handleLogin} className="button">Login</button>
                </div>
            </div>
        );
    }
}

const SIGNIN_USER_MUTATION = gql`
mutation SignInUserMutation($email: String!, $password: String!) {
    signInUser(email: $email, password: $password)
    {
        token
        user {
            firstName
        }
    }
}`

export default graphql(SIGNIN_USER_MUTATION, { name: 'signInUserMutation' }) (Login)