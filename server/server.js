import express from 'express'
import {
    graphqlExpress,
    graphiqlExpress,
} from 'graphql-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import { schema } from './src/schema'
import { PORT, MONGO_URL } from './constants'
import { authenticate } from './src/utils/authentication'

function start() {
    mongoose.connect(MONGO_URL)
    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error(error)
    }); 
    db.once('open', () => {
        const server = express()
        server.use('*', cors({ origin: 'http://localhost:3000' }))

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
            passHeader: `'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5YTEzMGM2NmI4Njc0YzU0YWEwYWYwMCIsImlhdCI6MTUwMzc0MTQzMiwiZXhwIjoxNTAzNzQ1MDMyfQ.tAacyYGbY3nW4Faw8Zz3DEWBGqrRSotBK594GKmavkc'`,
        }))

        server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`))
    });

    /*
    const buildOptions = async (req, res) => {
        const user = await authenticate(req)
        return {
            context: {
                dataloaders: buildDataloaders(mongo),
                mongo,
                user
            },
            formatError,
            schema
        }
    }
    */
}

start()
