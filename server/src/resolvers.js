const medtronicSensorRecords = [
    {
        "id": "fbc273db-5d56-4dba-82f8-a7f475e8f1bd",
        "senseDateTime": 56,
        "calibrationFactor": 68.28690633484541,
        "unfilteredValue": 84.99966675339098,
        "isigValue": 37.582370040109666
    },
    {
        "id": "faab61ea-985f-40c0-bcd9-b76558f0c85e",
        "senseDateTime": 97,
        "calibrationFactor": 95.15017669553961,
        "unfilteredValue": 17.85524687493725,
        "isigValue": 87.88712460777072
    }
]
export const resolvers = {
    Query: {
        medtronicSensorRecords: () => {
            return medtronicSensorRecords
        }
    },
};