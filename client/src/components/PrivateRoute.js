import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

function PrivateRoute({ 
    component: Component, 
    isAuthenticated: isAuthenticated, 
    redirectPathname: pathname, 
    ...rest }) {
    return (
        <Route {...rest} render={props => (
            isAuthenticated ?
            (<Component {...props} />) :
            (<Redirect to={{ pathname: pathname, state: { from: props.location } }} />)
        )}/>
    );
}

  export default PrivateRoute