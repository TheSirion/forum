import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

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
      request.user_id = decodedToken?.id
      return next()
    }
  })
}
