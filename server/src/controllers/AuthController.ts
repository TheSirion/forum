import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import database from '../config/connection'

export default class AuthController {
  async create (request: Request, response: Response) {
    const { username, email, password, avatar } = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const query = 'INSERT INTO users(username, email, password, avatar) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING'
    const values = [username, email, hashedPassword, avatar]

    const { rows } = await database.query(query, values)

    return response.status(201).json(rows)
  }
}
