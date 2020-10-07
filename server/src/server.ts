import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World' })
})

app.listen(3333, () => console.log('Listening on 3333'))
