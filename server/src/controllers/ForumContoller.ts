import { Request, Response } from 'express'
import database from '../config/connection'

export default class ForumController {
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
