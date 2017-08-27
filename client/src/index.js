import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
} from 'react-apollo';

import './styles/index.css'
import { loadUserToken } from './utils/localStorage'

const networkInterface = createNetworkInterface({
    uri: '/graphql'
})

networkInterface.use([{
    applyMiddleware(req, next) {
        const token = loadUserToken()
        if (!req.options.headers) {
            req.options.headers = {}
        }
        req.options.headers.authorization = token ? `bearer ${token}` : ""
        next()
    }
}])

const gqlClient = new ApolloClient({
    networkInterface
});

ReactDOM.render(
    <ApolloProvider client={gqlClient}>
        <App />
    </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
