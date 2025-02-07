import { Request } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'

const {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN,
} = process.env

export const signToken = (payload: any, secret: string = JWT_SECRET as string, options?: SignOptions) => {
    return jwt.sign(payload, secret, options)
}

export const verifyToken = (token: string, secret = JWT_SECRET as string) => {
    return jwt.verify(token, secret)
}

export const createRefreshToken = (payload: any) => {
    return signToken(payload, REFRESH_TOKEN_SECRET, {
        //expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    })
}

export const createAccessToken = (payload: any) => {
    return signToken(payload, JWT_SECRET, {
        //expiresIn: JWT_EXPIRES_IN,
    })
}

export const extractJWTfromAuthHeader = (req: Request) => {
    let token: string = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    return token;
}