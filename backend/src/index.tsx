import { Hono } from 'hono'
import { notion } from './notion/api'
import { ogp } from './ogp/api'

const app = new Hono()

app.route('/api/notion', notion)
app.route('/api/ogp', ogp)

export default app


