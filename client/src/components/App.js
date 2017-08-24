import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom'

import '../styles/App.css'
import Dashboard from './Dashboard'
import Authenticate from './Authenticate'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/auth" component={Authenticate} />
                </div>
            </Router>
        );
    }
}

export default App