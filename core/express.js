import express from 'express'
import http from 'http'
import useMiddleware from '#middleware/express/index.js'
import routes from '#routes/index.js'

export default async (serverPort) => {
  const app = express()

  await useMiddleware(app)
  await app.use(routes)

  await app.use(async (err, req, res, next) => {
    console.error(err.stack)
    await res.status(500).json({ message: err.message })
  })

  await http.createServer(app).listen(serverPort, async () => {
    console.log(`Server ready on ${serverPort} port`)
  })
}
