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
    senseDateTime: Date!
    unfilteredValue: Float!
    isigValue: Float!
    units: MEDTRONIC_SENSOR_UNITS
    postedBy: User!
}

type User {
    id: ID!
    firstName: String!
    loginEmail: String!
    medtronicSensorUnits: MEDTRONIC_SENSOR_UNITS
}

type SignInData {
    token: String!
    user: User
}

type Query {
    medtronicSensorRecords: [MedtronicSensorRecord]
    test: String!
}

type Mutation {
    createUser(firstName: String!, email: String!, password: String!): User
    signInUser(email: String!, password: String!): SignInData
    createMedtronicSensorRecord(senseDateTime: Date!, unfilteredValue: Float!, isigValue: Float!, calibrationFactor: Float, units: MEDTRONIC_SENSOR_UNITS): MedtronicSensorRecord
    test: String!
}
`

const schema = makeExecutableSchema({typeDefs, resolvers})
export {schema}