import http from 'http'
import {app} from './app.js'
import {logger} from './logger.js'
import {config} from 'dotenv'

config()

const server = http.createServer(app)

const port = process.env.PORT || 8080

const banner = `
   ___    _   ______________________   ________ __
   /   |  / | / /_  __/ ___/_  __/   | / ____/ //_/
  / /| | /  |/ / / /  \__ \ / / / /| |/ /   / ,<
 / ___ |/ /|  / / /  ___/ // / / ___ / /___/ /| |
/_/  |_/_/ |_/ /_/  /____//_/ /_/  |_\____/_/ |_|
`

server.listen(port, function () {
  console.info(banner)
  const address = server.address()
  logger.info(`Server is running on ${address.address}:${address.port}`)
})
