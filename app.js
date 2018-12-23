const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()
const router = express.Router()

router.use(compression())
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

router.get('/', (req, res) => {
  console.log('GET /')
  res.status(200).send({
    hello: 'there'
  })
})

router.get('/hello-world', (req, res) => {
  console.log('GET /hello-world')
  return res.status(200).send({
    thing: 'Thing'
  })
})

app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app
