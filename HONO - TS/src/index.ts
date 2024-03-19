import { Hono } from 'hono'
import { Context } from 'hono'

const app = new Hono()

//add benchmark middleware
app.use(async (c: Context, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
})

app.get('/', (c) => {
  console.log('Hello Hono!', c)
  return c.text('Hello Hono!')
})

export default app
