import {
    makeExecutableSchema,
} from 'graphql-tools'

import { resolvers } from './resolvers'

const typeDefs = `

enum MEDTRONIC_SENSOR_UNITS {
    MMOL_L
    MG_DL
}

type MedtronicSensorRecord {
    id: ID!
    calibrationFactor: Float
    senseDateTime: Int!
    unfilteredValue: Float!
    isigValue: Float!
}

type User {
    id: ID!
    name: String!
    emails: [String!]
    medtronicSensorUnitS: MEDTRONIC_SENSOR_UNITS!
}

type Query {
    medtronicSensorRecords: [MedtronicSensorRecord]
}
`

const schema = makeExecutableSchema({typeDefs, resolvers})
export {schema}