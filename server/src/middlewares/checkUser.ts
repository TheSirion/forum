import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async function (request: Request, response: Response, next: NextFunction) {
  const { authorization, cookie } = request.headers

  if (!authorization && !cookie) {
    return response.status(401)
  }

  const token = authorization?.replace('Bearer', '').trim()!
  const refreshToken = cookie?.replace('refreshToken=', '').trim()

  jwt.verify(token, process.env.LOGIN_TOKEN_SECRET!, (error, decodedToken: any) => {
    if (error instanceof jwt.TokenExpiredError) {
      jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, (error, decodedRefreshToken: any) => {
        if (error) {
          throw error
        }

        const token = jwt.sign(decodedRefreshToken.id[0], process.env.REFRESH_TOKEN_SECRET!, {
          expiresIn: '15min'
        })

        return response.status(200).json(token)
      })
    } else {
      request.user_id = decodedToken?.id
      next()
    }
  })
}
