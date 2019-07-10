const { Nuxt, Builder } = require('nuxt')

/**
 * API请求
 */

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const requireAll = require('require-all')
const cors = require('cors')
const path = require('path')

const express = require('express')
const consola = require('consola')
const app = express()
app
  .use(cors({ origin: '*', credentials: true }))
  .use(bodyParser.json({ limit: '50mb' }))
  .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  .use(cookieParser())
  .use(
    '/public',
    express.static(path.resolve(__dirname, '../public'), {
      maxAge: 1000 * 60 * 60 * 24
    })
  )
const routes = requireAll({
  dirname: path.join(__dirname, './routes/'),
  filter: /(.+)\.route\.js$/
})
for (const router of Object.values(routes)) {
  app.use('/api', router)
}
/**
 * API请求结束
 */
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
