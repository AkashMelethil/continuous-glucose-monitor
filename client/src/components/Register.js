import React from 'react'
import { graphql, gql } from 'react-apollo'

import { AUTH_TOKEN } from '../constants'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    saveUserToken(token) {
        localStorage.setItem(AUTH_TOKEN, token)
    }

    async handleRegistration() {
        /*const { name, email, password } = this.state;
        try {
            const result = await this.props.signInUserMutation({
                variables: {
                    name,
                    email,
                    password
                }
            })
            console.log(result)
            const { token, user } = result.data.signInUser
            this.saveUserToken(token)
            this.props.setIsAuthenticated({ isAuthenticated: true, userData: user })
        }
        catch (err) {
            console.error(err)
        }*/
    }

    render() {
        const { location, isAuthenticated, setIsAuthenticated, showError } = this.props
        return (
            <div className="register-container">
                <div className="input">
                    <label className="fa fa-user fa-fw" aria-hidden="true"></label>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </div>
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
                <div className="button-container">
                    <button onClick={this.handleRegistration} className="button">Sign up</button>
                </div>
            </div>
        );
    }
}

const CREATE_USER_MUTATION = gql`
mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
        firstName: $name,
        email: $email,
        password: $password
    ) {
        firstName
    }

    signInUser(email: $email, password: $password)
    {
        token
        user {
            firstName
        }
    }
}
`
export default graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }) (Register)