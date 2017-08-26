export const typeDefs = `

enum MEDTRONIC_SENSOR_UNITS {
    MMOL_L
    MG_DL
}

type User {
    id: ID!
    name: String!
    emails: [String!]
    medtronicSensorUnitS: MEDTRONIC_SENSOR_UNITS!
}

type MedtronicSensorRecord {
    id: ID!
    calibrationFactor: Float
    senseDateTime: Int!
    unfilteredValue: Float!
    isigValue: Float!
}

type Query {
    medtronicSensorRecords: [MedtronicSensorRecord]
}
`;