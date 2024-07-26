import { Hono } from 'hono'
import { renderer } from '../renderer'

const ogp = new Hono()
ogp.use(renderer)
    
ogp.get('/', (c) => {
    return c.text('Hello OGP!')
})

ogp.get('/example', (c) => {
    return c.render(<h1>Hello!</h1>)
})  

export { ogp }
