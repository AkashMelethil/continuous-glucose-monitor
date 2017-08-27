import { GraphQLScalarType } from 'graphql'
import validator from 'validator'
import mongoose from 'mongoose'

import User from './models/user'
import MedtronicSensorRecord from './models/medtronicSensorRecord'
import { generateJWTToken } from './utils/authentication'
import ValidationError from './ValidationError'
import AuthenticationError from './AuthenticationError'
import sendEmail from './utils/sendEmail'
import { uploadEntry } from './nightscout'

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
            if (ast.kind === 'IntValue') {
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

            return new Promise((resolve, reject) => {
                MedtronicSensorRecord.find({ postedBy: user._id }).exec((err, records) => {
                    if (err) return reject(err)
                    resolve(records)
                })
            })
        }
    },
    Mutation: {
        createMedtronicSensorRecord: async (obj, {
            senseDateTime,
            unfilteredValue,
            isigValue,
            calibrationFactor,
            units
        }, { user }) => {
            const errors = []
            if (!user) {
                errors.push({ key: 'authorization', message: 'The request does not have correct authentication.'})
            }
            if (errors.length) throw new AuthenticationError(errors);

            const newRecord = new MedtronicSensorRecord({ 
                senseDateTime, 
                unfilteredValue, 
                isigValue,
                postedBy: user.id
            })
            newRecord.id = newRecord._id
            if (calibrationFactor) newRecord.calibrationFactor = calibrationFactor
            if (units) newRecord.units = units
            //newRecord.postedBy = user

            const savedRecord = await new Promise((resolve, reject) => {
                newRecord.save((err) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(newRecord)
                    }
                })
            })

            const resultRecord = {
                id: savedRecord._id,
                calibrationFactor: savedRecord.calibrationFactor,
                senseDateTime: savedRecord.senseDateTime, 
                unfilteredValue: savedRecord.unfilteredValue,
                isigValue: savedRecord.isigValue,
                units: savedRecord.units,
                postedBy: user.id
            }

            uploadEntry(resultRecord)

            resultRecord.postedBy = user
            return resultRecord
        },
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
                User.findOne({ loginEmail: email }, (error, user) => {
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
    },
    MedtronicSensorRecord: {
        id: root => root._id || root.id,
        postedBy: async ({ postedBy }, data, context) => {
            const user = await new Promise((resolve, reject) => {
                User.findOne({ _id: postedBy }, (error, user) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(user)
                })
            })
            return user
        },
    }
};