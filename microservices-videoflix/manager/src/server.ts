import "reflect-metadata";
import 'dotenv/config'

import { app } from './app'

const server = app.listen(process.env.PORT, () =>
  console.log('Server is Running on PORT: ', process.env.PORT)
)

process.on('SIGINT', () => {
  console.log('server is closed', Date.now())
  server.close()
})