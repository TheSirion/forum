import { config } from 'dotenv'
import express from 'express'

import routes from './routes'

config()
const app = express()
app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('Listening on 3333'))
