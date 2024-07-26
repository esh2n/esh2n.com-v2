import { Hono } from 'hono'

const notion = new Hono()

notion.get('/', (c) => {
    return c.text('Hello Notion!')
})

export { notion }
