import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import '../styles/App.css'
import Dashboard from './Dashboard'
import Authenticate from './Authenticate'
import PrivateRoute from './PrivateRoute'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false
        }

        this.setIsAuthenticated = this.setIsAuthenticated.bind(this)
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
                    <PrivateRoute exact path="/"
                        redirectPathname="/auth"
                        component={Dashboard}
                        isAuthenticated={this.state.isAuthenticated}
                        setIsAuthenticated={this.setIsAuthenticated}
                    />
                    <Route path="/auth" render={routeProps => <Authenticate 
                        {...routeProps}
                        isAuthenticated={this.state.isAuthenticated}
                        setIsAuthenticated={this.setIsAuthenticated}/>}
                    />
                </div>
            </Router>
        );
    }
}

export default App