import mongoose from 'mongoose'
import User from './user'

const MedtronicSensorRecordSchema = new mongoose.Schema(
    {
        calibrationFactor: {
            type: Number,
        },
        senseDateTime: {
            type: Date,
            required: true
        },
        unfilteredValue: {
            type: Number,
            required: true
        },
        isigValue: {
            type: Number,
            required: true
        },
        units: {
            type: String,
            enum: ['MMOL_L', 'MG_DL'],
            default: 'MG_DL'
        },
        postedBy: {
            type: mongoose.Schema.ObjectId, 
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('MedtronicSensorRecord', MedtronicSensorRecordSchema)