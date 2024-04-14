import { Hono } from 'hono'
import { Context } from 'hono'
import { sum } from './functions/sum'

const app = new Hono()

//add benchmark middleware
app.use(async (c: Context, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
})

app.get('/', (c) => {
  console.time('Hello Hono!')
  let j = 0
  for (let i = 0; i < 15; i++) {
    j += sum(i, j)
  }
  console.log('Hello Hono!', c)
  console.timeEnd('Hello Hono!')
  return c.text(`Hello Hono! ${j}`)
})

export default app
