import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

function ConditionalRedirectRoute({ 
    component: Component, 
    condition, 
    redirectPathname: pathname,
    passProps,
    ...rest }) {
    return (
        <Route {...rest} render={props => (
            condition?
            (<Component {...{...props, ...passProps}} />) :
            (<Redirect to={{ pathname: pathname, state: { from: props.location } }} />)
        )}/>
    );
}

export default ConditionalRedirectRoute