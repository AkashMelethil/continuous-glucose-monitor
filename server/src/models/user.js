import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const UserSchema = new mongoose.Schema(
    {
        loginEmail: {
            type: String,
            lowercase: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        role: {
            type: String,
            enum: ['Client', 'Admin'],
            default: 'Client'
        },
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', function(next) {
    const user = this
    const SALT_FACTOR = 5

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) { 
                return reject(err)
            }
            resolve(isMatch)
        })
    })
}

export default mongoose.model('User', UserSchema)