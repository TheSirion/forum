import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import database from '../config/connection'

export default async function (request: Request, response: Response, next: NextFunction) {
  const { authorization, cookie } = request.headers

  if (!authorization && !cookie) {
    throw Error('User is not authorized')
  }

  const token = authorization?.replace('Bearer', '').trim()!
  const refreshToken = cookie?.replace('refreshToken=', '').trim()

  jwt.verify(token, process.env.LOGIN_TOKEN_SECRET!, (error, decodedToken: any) => {
    if (error instanceof jwt.TokenExpiredError) {
      jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, (error, decodedRefreshToken: any) => {
        if (error) {
          throw error
        }

        const token = jwt.sign({ id: decodedRefreshToken.id }, process.env.LOGIN_TOKEN_SECRET!, {
          expiresIn: '15min'
        })

        return response.status(200).json(token)
      })
    } else if (error) {
      throw error
    } else {
      (async () => {
        const { rows } = await database.query<{ role_id: number }>('SELECT * FROM user_role JOIN roles ON roles.role_id = user_role.role_id WHERE user_role.user_id = $1', [decodedToken?.id])

        const { role_id } = rows[0]

        request.user_id = decodedToken?.id

        request.role = role_id

        return next()
      })()
    }
  })
}
