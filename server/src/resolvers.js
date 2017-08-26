import { GraphQLScalarType } from 'graphql'
import validator from 'validator'

import User from './models/user'
import { generateJWTToken } from './utils/authentication'
import ValidationError from './ValidationError'
import AuthenticationError from './AuthenticationError'
import sendEmail from './utils/sendEmail'

const medtronicSensorRecords = [
    {
        "id": "fbc273db-5d56-4dba-82f8-a7f475e8f1bd",
        "senseDateTime": 10,
        "calibrationFactor": 68.28690633484541,
        "unfilteredValue": 84.99966675339098,
        "isigValue": 37.582370040109666
    },
    {
        "id": "faab61ea-985f-40c0-bcd9-b76558f0c85e",
        "senseDateTime": 20,
        "calibrationFactor": 95.15017669553961,
        "unfilteredValue": 27.85524687493725,
        "isigValue": 87.88712460777072
    },
    {
        "id": "fbc273db-5d56-4dba-82f8-a7f475e8f1bf",
        "senseDateTime": 30,
        "calibrationFactor": 68.28690633484541,
        "unfilteredValue": 34.99966675339098,
        "isigValue": 37.582370040109666
    },
    {
        "id": "faab61ea-985f-40c0-bcd9-b76558f0c85g",
        "senseDateTime": 40,
        "calibrationFactor": 95.15017669553961,
        "unfilteredValue": 56.85524687493725,
        "isigValue": 87.88712460777072
    },
    {
        "id": "fbc273db-5d56-4dba-82f8-a7f475e8f1bh",
        "senseDateTime": 50,
        "calibrationFactor": 68.28690633484541,
        "unfilteredValue": 73.99966675339098,
        "isigValue": 37.582370040109666
    },
    {
        "id": "faab61ea-985f-40c0-bcd9-b76558f0c85i",
        "senseDateTime": 60,
        "calibrationFactor": 95.15017669553961,
        "unfilteredValue": 35.85524687493725,
        "isigValue": 87.88712460777072
    },
    {
        "id": "fbc273db-5d56-4dba-82f8-a7f475e8f1bj",
        "senseDateTime": 70,
        "calibrationFactor": 68.28690633484541,
        "unfilteredValue": 81.99966675339098,
        "isigValue": 37.582370040109666
    },
    {
        "id": "faab61ea-985f-40c0-bcd9-b76558f0c85k",
        "senseDateTime": 80,
        "calibrationFactor": 9.15017669553961,
        "unfilteredValue": 50.85524687493725,
        "isigValue": 87.88712460777072
    }
]

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
    Query: {
        medtronicSensorRecords: async (obj, args, { user }) => {
            const errors = []
            if (!user) {
                errors.push({ key: 'authorization', message: 'The request does not have correct authentication.'})
            }
            if (errors.length) throw new AuthenticationError(errors);

            return medtronicSensorRecords
        }
    },
    Mutation: {
        createUser: async (obj, {firstName, email, password}, context) => {
            const errors = []

            if (!validator.isLength(email, { max: 250 })) {
                errors.push({ key: 'email', message: 'The email must be at a maximum 250 characters long.'});
            }
            else if (!validator.isEmail(email)) {
                errors.push({ key: 'email', message: 'The email is not a valid format.'});
            }

            if (!validator.isLength(password, { min: 6 })) {
                errors.push({ key: 'password', message: 'The password must be at a minimum 6 characters long.'});
            }

            const existingUser = await new Promise((resolve, reject) => {
                User.findOne({ email: email }, (error, user) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(user)
                })
            })
            if (existingUser) {
                errors.push({ key: 'email', message: 'That email is already in use.'});
            }

            if (errors.length) throw new ValidationError(errors);

            const newUser = new User({
                loginEmail: email,
                password: password,
                firstName: firstName
            })
            newUser.id = newUser._id
            return new Promise((resolve, reject) => {
                newUser.save((err) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(newUser)
                    }
                })
            })
        },
        signInUser: async (obj, { email, password }, context) => {
            const user = await new Promise((resolve, reject) => {
                User.findOne({ loginEmail: email }, (error, user) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(user)
                })
            })
            
            const errors = []
            if (!user) {
                errors.push({ key: 'email', message: 'That email is not in our records.'});
            }
            if (errors.length) throw new ValidationError(errors);

            const isMatch = await user.comparePassword(password)
            if (!isMatch) {
                errors.push({ key: 'password', message: 'That password does not match our records.'});
            }
            if (errors.length) throw new ValidationError(errors);

            return {
                token: generateJWTToken(user),
                user: user
            }
        },
    },
    User: {
        id: root => root._id || root.id,
    }
};