import jwt from 'jsonwebtoken'

import User from '../models/user'
import { JWT_SECRET } from '../secret'

const HEADER_REGEX = /Bearer (.*)$/;

async function authenticate({ headers: { authorization } }) {
    try {
        const tokenStr = authorization && HEADER_REGEX.exec(authorization)[1];
        if (!tokenStr) {
            return null
        }

        const token = jwt.verify(tokenStr, JWT_SECRET)

        const user = await new Promise((resolve, reject) => {
            User.findOne({ _id: token.id }, (error, user) => {
                if (error) {
                    return reject(error)
                }
                resolve(user)
            })
        })

        if (!user) {
            return null
        }
        return user
    }
    catch (err) {
        return null
    }
}

function generateJWTToken(user) {
    return jwt.sign({
        id: user._id
    }, JWT_SECRET, { expiresIn: '5h' });
}

export {authenticate, generateJWTToken}