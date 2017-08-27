import express from 'express'
import {
    graphqlExpress,
    graphiqlExpress,
} from 'apollo-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'

import { schema } from './src/schema'
import { PORT, MONGO_URL } from './constants'
import { authenticate } from './src/utils/authentication'

function start() {
    console.log(path.join(__dirname, '..', 'client', 'build'))
    mongoose.connect(MONGO_URL)
    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error(error)
    }); 
    db.once('open', () => {
        const server = express()
        server.use('*', cors({ origin: 'http://localhost:3000' }))

        // Serve React App
        server.use(express.static(path.join(__dirname, '..', 'client', 'build')));
        server.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
        });

        const buildOptions = async (req, res) => {
            const user = await authenticate(req)
            return {
                context: {
                    user
                },
                formatError: error => ({
                    message: error.message,
                    state: error.originalError && error.originalError.state,
                    locations: error.locations,
                    path: error.path,
                }),
                schema
            }
        }
        server.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions))

        server.use('/graphiql', graphiqlExpress({
            endpointURL: '/graphql',
            passHeader: `'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5YTFkOTQ2MjYyMWQyMzg2Njk0NzY1OCIsImlhdCI6MTUwMzc3OTIwOCwiZXhwIjoxNTAzNzk3MjA4fQ.txzXrsFIvXZ7UA9xScRIKJr549akXFY6WPxz-wtaK9o'`,
        }))

        server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`))
    });
}

start()
