import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import * as Yup from 'yup'
import jwt from 'jsonwebtoken'

import database from '../config/connection'

export default class AuthController {
  async create (request: Request, response: Response) {
    const { username, email, password, avatar } = request.body

    const data = {
      username, email, password, avatar
    }

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      avatar: Yup.string().notRequired()
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const hashedPassword = await bcrypt.hash(password, 10)

    const query = 'INSERT INTO users(username, email, password, avatar) VALUES($1, $2, $3, $4) RETURNING user_id'
    const values = [username, email, hashedPassword, avatar]

    try {
      const { rows } = await database.query<{ user_id: number }>(query, values)

      const { user_id } = rows[0]

      const token = jwt.sign({ id: user_id }, process.env.LOGIN_TOKEN_SECRET!, {
        expiresIn: '15min'
      })

      const refreshToken = jwt.sign({ id: user_id }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: '7d'
      })

      await database.query('UPDATE users SET refresh_token = $1 WHERE user_id = $2', [refreshToken, user_id])

      response.setHeader('Set-Cookie', [`refreshToken=${refreshToken}; httpOnly;`])

      return response.status(201).json(token)
    } catch (err) {
      if (/unique/.test(err)) {
        const error = new Yup.ValidationError('Unique', err, 'register')

        error.inner = [new Yup.ValidationError('User already exists', err, 'register')]

        throw error
      } else {
        throw new Error(err)
      }
    }
  }

  async login (request: Request, response: Response) {
    const { email, password } = request.body

    const data = { email, password }

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const query = 'SELECT user_id, password FROM users WHERE email = $1'
    const values = [email]

    try {
      const { rows } = await database.query<{ user_id: number, password: string }>(query, values)

      const { password, user_id } = rows[0]

      if (await bcrypt.compare(data.password, password)) {
        const token = jwt.sign({ id: user_id }, process.env.LOGIN_TOKEN_SECRET!, {
          expiresIn: '15min'
        })

        const refreshToken = jwt.sign({ id: user_id }, process.env.REFRESH_TOKEN_SECRET!, {
          expiresIn: '7d'
        })

        await database.query('UPDATE users SET refresh_token = $1 WHERE user_id = $2', [refreshToken, user_id])

        response.setHeader('Set-Cookie', [`refreshToken=${refreshToken}; httpOnly;`])

        return response.status(200).json(token)
      } else {
        const error = new Yup.ValidationError('Password', 'wrong pass', 'login')

        error.inner = [new Yup.ValidationError('Password is incorrect', 'wrong pass', 'login')]

        throw error
      }
    } finally {}
  }

  async logout (request: Request, response: Response) {
    const refreshToken = request.headers.cookie?.replace('refreshToken=', '')

    const query = 'UPDATE users SET refresh_token = $1 WHERE refresh_token = $2'
    const values = [null, refreshToken]

    await database.query(query, values)

    return response.status(200).send()
  }
}
