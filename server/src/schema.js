import {
    makeExecutableSchema,
} from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `

scalar Date

enum MEDTRONIC_SENSOR_UNITS {
    MMOL_L
    MG_DL
}

type MedtronicSensorRecord {
    id: ID!
    calibrationFactor: Float
    senseDateTime: Int! #Date!
    unfilteredValue: Float!
    isigValue: Float!
    units: MEDTRONIC_SENSOR_UNITS
}

type User {
    id: ID!
    firstName: String!
    loginEmail: String!
    medtronicSensorUnitS: MEDTRONIC_SENSOR_UNITS
}

type SignInData {
    token: String!
    user: User
}

type Query {
    medtronicSensorRecords: [MedtronicSensorRecord]
}

type Mutation {
    createUser(firstName: String!, email: String!, password: String!): User
    signInUser(email: String!, password: String!): SignInData
}
`

const schema = makeExecutableSchema({typeDefs, resolvers})
export {schema}