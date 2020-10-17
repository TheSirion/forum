import { Request, Response } from 'express'
import database from '../config/connection'

export default class PostController {
  async index (request: Request, response: Response) {
    const { page = 1 } = request.query

    const query = 'SELECT * FROM posts ORDER BY post_id DESC LIMIT 20 OFFSET $1'
    const values = [(Number(page) - 1) * 20]

    const { rows } = await database.query(query, values)

    return response.status(200).json(rows)
  }

  async show (request: Request, response: Response) {
    const { id } = request.params

    const query = 'SELECT * FROM posts WHERE post_id = $1'
    const values = [id]

    const { rows } = await database.query(query, values)

    return response.status(200).json(rows)
  }

  async create (request: Request, response: Response) {
    const { forum_id, title, content } = request.body
    const { user_id } = request

    const query = 'INSERT INTO posts (user_id, forum_id, title, content) VALUES ($1, $2, $3, $4)'
    const values = [user_id, forum_id, title, content]

    await database.query(query, values)

    return response.status(201).send()
  }
}
