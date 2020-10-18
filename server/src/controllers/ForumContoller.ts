import { Request, Response } from 'express'
import database from '../config/connection'

export default class ForumController {
  async index (request: Request, response: Response) {
    const query = 'SELECT * FROM forums'

    const { rows } = await database.query(query)

    return response.status(200).json(rows)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const query = 'SELECT * FROM forums WHERE forum_id = $1'
    const values = [id]

    const { rows } = await database.query(query, values)

    if (rows.length === 0) {
      throw Error('This forum does not exist')
    }

    return response.status(200).json(rows)
  }

  async create (request: Request, response: Response) {
    const { forum_name, forum_description } = request.body
    const { role, user_id } = request

    if (role === 1) {
      throw Error('User is not allowed to create forum')
    }

    const query = 'INSERT INTO forums (forum_name, forum_creator_id, forum_description) VALUES ($1, $2, $3)'
    const values = [forum_name, user_id, forum_description]

    const { rows } = await database.query(query, values)

    return response.status(201).json(rows)
  }
}
