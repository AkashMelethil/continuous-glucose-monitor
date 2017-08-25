import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import '../styles/App.css'
import Dashboard from './Dashboard'
import Authenticate from './Authenticate'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,
            errorValue: null
        }

        this.setIsAuthenticated = this.setIsAuthenticated.bind(this)
        this.showError = this.showError.bind(this)
    }

    showError(errorValue) {
        this.setState({
            errorValue: errorValue
        })

        setTimeout(() => {
            this.setState({
                errorValue: null
            })
        }, 3500)
    }

    setIsAuthenticated(isAuthenticated) {
        console.log(`Called with a value of ${isAuthenticated}`)
        this.setState({
            isAuthenticated: isAuthenticated
        })
    }

    render() {
        return (
            <Router>
                <div>
                    {(this.state.errorValue !== null) && (<div className="notification">
                        <span className="notification-value">{this.state.errorValue}</span>
                    </div>)}
                    <ConditionalRedirectRoute exact path="/"
                        redirectPathname="/auth"
                        component={Dashboard}
                        condition={this.state.isAuthenticated}
                        passProps={{
                            isAuthenticated: this.state.isAuthenticated,
                            setIsAuthenticated: this.setIsAuthenticated,
                            showError: this.showError
                        }}
                    />
                    <ConditionalRedirectRoute path="/auth"
                        redirectPathname="/"
                        component={Authenticate}
                        condition={!this.state.isAuthenticated}
                        passProps={{
                            isAuthenticated: this.state.isAuthenticated,
                            setIsAuthenticated: this.setIsAuthenticated,
                            showError: this.showError
                        }}
                    />
                </div>
            </Router>
        );
    }
}

export default App