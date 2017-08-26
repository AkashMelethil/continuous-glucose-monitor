import jwt from 'jsonwebtoken'

import User from '../models/user'
import { JWT_SECRET } from '../secret'

const HEADER_REGEX = /Bearer (.*)$/;

async function authenticate({ headers: { authorization } }) {
    const tokenStr = authorization && HEADER_REGEX.exec(authorization)[1];
    console.log(`Token String: ${tokenStr}`)
    if (!tokenStr) {
        return null
    }

    try {
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
    const tokenStr = jwt.sign({
        id: user._id
    }, JWT_SECRET, { expiresIn: '1h' });

    console.log(tokenStr)

    jwt.verify(tokenStr, JWT_SECRET, function(err, decoded) {
        console.log(decoded) // bar 
      });

      return tokenStr
}

export {authenticate, generateJWTToken}